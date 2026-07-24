import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Baby, Stethoscope, Brain, BookOpen } from 'lucide-react';
import HomePage from './pages/HomePage';
import PregnancyPage from './pages/PregnancyPage';
import BabyCarePage from './pages/BabyCarePage';
import HealthPage from './pages/HealthPage';
import DevelopmentPage from './pages/DevelopmentPage';
import KnowledgePage from './pages/KnowledgePage';

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
          <Route path="/pregnancy" element={<PregnancyPage />} />
          <Route path="/baby" element={<BabyCarePage />} />
          <Route path="/baby/record/:type" element={<BabyCarePage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
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
