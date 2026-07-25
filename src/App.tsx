import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Baby, Stethoscope, Brain, BookOpen, RefreshCw, Download, Upload } from 'lucide-react';
import HomePage from './pages/HomePage';
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

// Data sync component
function DataSync() {
  const [showSync, setShowSync] = useState(false);

  const exportData = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      try { data[key] = JSON.parse(localStorage.getItem(key)!); } catch { data[key] = localStorage.getItem(key); }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'baby-care-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
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
          alert('数据导入成功！请刷新页面。');
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
        width: 40, height: 40, borderRadius: '50%', background: '#5856d6',
        color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <RefreshCw size={18} />
      </button>
      {showSync && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 380 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>📦 数据同步</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
              导出数据为JSON文件，然后在另一台设备上导入即可同步所有记录。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-primary btn-block" onClick={exportData}>
                <Download size={16} style={{ marginRight: 6 }} />导出数据
              </button>
              <button className="btn btn-secondary btn-block" onClick={importData}>
                <Upload size={16} style={{ marginRight: 6 }} />导入数据
              </button>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowSync(false)} style={{ marginTop: 16, width: '100%' }}>关闭</button>
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
