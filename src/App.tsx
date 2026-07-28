import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Sprout, PenLine, RefreshCw } from 'lucide-react';
import { Component, type ReactNode } from 'react';
import HomePage from './pages/HomePage';
import BabyCarePage from './pages/BabyCarePage';
import PregnancyPage from './pages/PregnancyPage';
import KnowledgePage from './pages/KnowledgePage';
import HealthPage from './pages/HealthPage';
import DevelopmentPage from './pages/DevelopmentPage';
import { initApiKey, pushToCloud, pullFromCloud, setSyncUrl, getSyncUrl } from './data/sync';

/* ======== Error Boundary ======== */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: any) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>页面加载出错</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{this.state.error.message}</p>
          <button className="btn btn-sm btn-primary" onClick={() => this.setState({ error: null })}>重试</button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ======== 4-Tab Navigation ======== */
const pregnancyNav = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/grow', icon: Sprout, label: '周历' },
  { path: '/learn?tab=recipes', icon: BookOpen, label: '食谱' },
  { path: '/learn', icon: BookOpen, label: '知识' },
];
const babyNav = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/track', icon: PenLine, label: '记录' },
  { path: '/development', icon: Sprout, label: '成长' },
  { path: '/learn', icon: BookOpen, label: '知识' },
];

/* ======== Sync Panel ======== */
function DataSync() {
  const [showSync, setShowSync] = useState(false);
  const [syncUrl, setSyncUrlState] = useState(() => getSyncUrl());
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('');

  useEffect(() => {
    if (syncUrl) { pullFromCloud().then(() => { setLastSync(new Date().toLocaleTimeString('zh-CN')); window.dispatchEvent(new Event('storage')); }); }
  }, []);
  useEffect(() => {
    if (!syncUrl) return;
    const interval = setInterval(async () => { await pushToCloud(); setLastSync(new Date().toLocaleTimeString('zh-CN')); }, 30000);
    return () => clearInterval(interval);
  }, [syncUrl]);

  const enableSync = async () => { setSyncing(true); const url = await pushToCloud(); if (url) { setSyncUrlState(url); setLastSync(new Date().toLocaleTimeString('zh-CN')); } setSyncing(false); };
  const connectSync = () => { const url = prompt('请输入另一个设备上的同步链接：'); if (url && url.includes('jsonblob.com')) { setSyncUrl(url); setSyncUrlState(url); pullFromCloud().then(() => { setLastSync(new Date().toLocaleTimeString('zh-CN')); window.location.reload(); }); } else if (url) { alert('链接无效'); } };
  const copyUrl = () => { if (syncUrl) { navigator.clipboard.writeText(syncUrl).then(() => alert('已复制')); } };
  const exportData = () => { const data: Record<string, any> = {}; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i)!; try { data[key] = JSON.parse(localStorage.getItem(key)!); } catch { data[key] = localStorage.getItem(key); } } const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'baby-care-backup-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); URL.revokeObjectURL(url); };
  const importData = () => { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = (e) => { const file = (e.target as HTMLInputElement).files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const data = JSON.parse(reader.result as string); for (const [key, value] of Object.entries(data)) { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); } alert('导入成功！'); window.location.reload(); } catch { alert('导入失败'); } }; reader.readAsText(file); }; input.click(); };

  return (
    <>
      <button onClick={() => setShowSync(true)} title="数据同步" className="fab" style={{ bottom: 120, right: 16, width: 38, height: 38, background: syncUrl ? 'var(--success)' : '#9B8E7E' }}>
        <RefreshCw size={16} />
      </button>
      {showSync && (
        <div className="modal-overlay" onClick={() => setShowSync(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '70vh' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 14 }}>☁️ 数据同步</div>
            {syncUrl ? (
              <>
                <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 8 }}>● 已连接 · {lastSync || '同步中...'}</div>
                <button className="btn btn-sm btn-secondary" onClick={copyUrl} style={{ width: '100%', marginBottom: 6 }}>📋 复制同步链接</button>
                <button className="btn btn-sm btn-primary" onClick={enableSync} disabled={syncing} style={{ width: '100%', marginBottom: 12 }}>{syncing ? '同步中...' : '🔄 立即同步'}</button>
              </>
            ) : (
              <>
                <button className="btn btn-primary btn-block" onClick={enableSync} disabled={syncing} style={{ marginBottom: 8 }}>{syncing ? '创建中...' : '☁️ 开启云同步'}</button>
                <button className="btn btn-secondary btn-block" onClick={connectSync} style={{ marginBottom: 12 }}>🔗 连接已有同步</button>
              </>
            )}
            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: 10, display: 'flex', gap: 6 }}>
              <button className="btn btn-sm btn-secondary" onClick={exportData} style={{ flex: 1 }}>导出</button>
              <button className="btn btn-sm btn-secondary" onClick={importData} style={{ flex: 1 }}>导入</button>
            </div>
            <button className="btn btn-sm" onClick={() => setShowSync(false)} style={{ marginTop: 10, width: '100%', background: 'var(--border)' }}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ======== App ======== */
export default function App() {
  useEffect(() => { initApiKey(); }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [appMode, setAppMode] = useState<'pregnancy'|'baby'>(() => (localStorage.getItem('app_mode') as any) || 'pregnancy');

  // Listen for mode changes from HomePage
  useEffect(() => {
    const handler = () => setAppMode((localStorage.getItem('app_mode') as any) || 'pregnancy');
    window.addEventListener('modeChange', handler);
    return () => window.removeEventListener('modeChange', handler);
  }, []);

  useEffect(() => {
    if (location.pathname.match(/^\/track\/record/)) setShowNav(false);
    else setShowNav(true);
  }, [location.pathname]);

  // Determine which page to show for "Grow" tab based on mode

  return (
    <div className="app-container">
      <div className="page-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track" element={<BabyCarePage />} />
            <Route path="/track/record/:type" element={<BabyCarePage />} />
            <Route path="/grow" element={<PregnancyPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/learn" element={<KnowledgePage />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <DataSync />
      {showNav && (
        <nav className="bottom-nav">
          {(appMode === 'pregnancy' ? pregnancyNav : babyNav).map((item: any) => {
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
            return (
              <button key={item.path} className={'nav-item' + (isActive ? ' active' : '')} onClick={() => navigate(item.path)}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
