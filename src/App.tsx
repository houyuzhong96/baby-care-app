import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Baby, Stethoscope, Brain, BookOpen } from 'lucide-react';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
const PregnancyPage = lazy(() => import('./pages/PregnancyPage'));
const BabyCarePage = lazy(() => import('./pages/BabyCarePage'));
const HealthPage = lazy(() => import('./pages/HealthPage'));
const DevelopmentPage = lazy(() => import('./pages/DevelopmentPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>加载中...</div>}>
      {children}
    </Suspense>
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pregnancy" element={<LazyPage><PregnancyPage /></LazyPage>} />
          <Route path="/baby" element={<LazyPage><BabyCarePage /></LazyPage>} />
          <Route path="/baby/record/:type" element={<LazyPage><BabyCarePage /></LazyPage>} />
          <Route path="/health" element={<LazyPage><HealthPage /></LazyPage>} />
          <Route path="/development" element={<LazyPage><DevelopmentPage /></LazyPage>} />
          <Route path="/knowledge" element={<LazyPage><KnowledgePage /></LazyPage>} />
        </Routes>
      </div>
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
