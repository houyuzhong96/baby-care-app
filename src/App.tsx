import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Baby, Stethoscope, Brain, BookOpen, RefreshCw, Download, Upload } from 'lucide-react';
import HomePage from './pages/HomePage';
import { initApiKey, pushToCloud, pullFromCloud, setSyncUrl, getSyncUrl } from './data/sync';
import PregnancyPage from './pages/PregnancyPage';
import BabyCarePage from './pages/BabyCarePage';
import HealthPage from './pages/HealthPage';
import DevelopmentPage from './pages/DevelopmentPage';
import KnowledgePage from './pages/KnowledgePage';

// Error boundary to prevent blank screens
import { Component, type ReactNode } from 'react';
class ErrorBoundary extends Component<{ children: ReactNode; name: string }, { error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'var(--danger)', fontSize: 16, marginBottom: 8 }}>页面加载出错</p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{this.state.error.message}</p>
          <button className="btn btn-sm btn-primary" onClick={() => this.setState({ error: null })}>重试</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Auto cloud sync component
function DataSync() {
  const [showSync, setShowSync] = useState(false);
  const [syncUrl, setSyncUrlState] = useState(() => getSyncUrl());
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('');

  // Auto-sync on page load
  useEffect(() => {
    if (syncUrl) {
      pullFromCloud().then(() => {
        setLastSync(new Date().toLocaleTimeString('zh-CN'));
        window.dispatchEvent(new Event('storage'));
      });
    }
  }, []);

  // Auto-push every 30 seconds + on data change
  useEffect(() => {
    if (!syncUrl) return;
    const interval = setInterval(async () => {
      await pushToCloud();
      setLastSync(new Date().toLocaleTimeString('zh-CN'));
    }, 30000);
    return () => clearInterval(interval);
  }, [syncUrl]);

  const enableSync = async () => {
    setSyncing(true);
    const url = await pushToCloud();
    if (url) {
      setSyncUrlState(url);
      setLastSync(new Date().toLocaleTimeString('zh-CN'));
    } else {
      alert('同步失败，请检查网络后重试。');
    }
    setSyncing(false);
  };

  const connectSync = () => {
    const url = prompt('请输入另一个设备上的同步链接（可从已开启同步的设备上复制）：');
    if (url && url.includes('jsonblob.com')) {
      setSyncUrl(url);
      setSyncUrlState(url);
      pullFromCloud().then(() => {
        setLastSync(new Date().toLocaleTimeString('zh-CN'));
        window.location.reload();
      });
    } else if (url) {
      alert('请输入有效的同步链接。');
    }
  };

  const copyUrl = () => {
    if (syncUrl) {
      navigator.clipboard.writeText(syncUrl).then(() => alert('同步链接已复制！在另一台设备上打开同步面板，点击"连接已有同步"并粘贴。'));
    }
  };

  const exportData = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      try { data[key] = JSON.parse(localStorage.getItem(key)!); } catch { data[key] = localStorage.getItem(key); }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'baby-care-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click(); URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
          }
          alert('数据导入成功！页面将刷新。');
          window.location.reload();
        } catch { alert('导入失败：文件格式不正确'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <>
      <button onClick={() => setShowSync(true)} title="数据同步" style={{
        position: 'fixed', bottom: 156, right: 16, zIndex: 150,
        width: 40, height: 40, borderRadius: '50%', background: syncUrl ? '#34c759' : '#5856d6',
        color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <RefreshCw size={18} />
      </button>
      {showSync && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 380, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>☁️ 云同步</div>
            
            {syncUrl ? (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: 'var(--success)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} /> 已连接
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  上次同步：{lastSync || '刚刚'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  数据每30秒自动同步到云端。在另一台设备打开此App，点击"连接已有同步"并粘贴同步链接。
                </div>
                <button className="btn btn-sm btn-secondary" onClick={copyUrl} style={{ fontSize: 12, marginBottom: 4, width: '100%' }}>
                  📋 复制同步链接
                </button>
                <button className="btn btn-sm btn-primary" onClick={enableSync} disabled={syncing} style={{ fontSize: 12, marginBottom: 4, width: '100%' }}>
                  {syncing ? '同步中...' : '🔄 立即同步'}
                </button>
              </div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  开启云同步后，数据自动保存到云端，在其他设备上连接即可同步。
                </p>
                <button className="btn btn-primary btn-block" onClick={enableSync} disabled={syncing} style={{ marginBottom: 8 }}>
                  {syncing ? '创建中...' : '☁️ 开启云同步'}
                </button>
                <button className="btn btn-secondary btn-block" onClick={connectSync} style={{ fontSize: 13 }}>
                  🔗 连接已有同步
                </button>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>离线备份</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm btn-secondary" onClick={exportData} style={{ flex: 1, fontSize: 12 }}>
                  <Download size={14} style={{ marginRight: 4 }} />导出
                </button>
                <button className="btn btn-sm btn-secondary" onClick={importData} style={{ flex: 1, fontSize: 12 }}>
                  <Upload size={14} style={{ marginRight: 4 }} />导入
                </button>
              </div>
            </div>
            <button className="btn btn-sm" onClick={() => setShowSync(false)} style={{ marginTop: 12, width: '100%', background: 'var(--border)' }}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/pregnancy', icon: Heart, label: '孕期' },
  { path: '/baby', icon: Baby, label: '宝宝' },
  { path: '/health', icon: Stethoscope, label: '健康' },
  { path: '/development', icon: Brain, label: '发育' },
  { path: '/knowledge', icon: BookOpen, label: '知识' },
];

export default function App() {
  useEffect(() => { initApiKey(); }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (location.pathname.match(/^\/baby\/record/)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="page-content">
        <ErrorBoundary name={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pregnancy" element={<PregnancyPage />} />
            <Route path="/baby" element={<BabyCarePage />} />
            <Route path="/baby/record/:type" element={<BabyCarePage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <DataSync />
      {showNav && (
        <nav className="bottom-nav">
          {navItems.map(item => {
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                className={'nav-item' + (isActive ? ' active' : '')}
                onClick={() => navigate(item.path)}
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
