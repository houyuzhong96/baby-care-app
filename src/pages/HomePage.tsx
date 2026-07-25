import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, Droplets, Moon, Activity, Clock, TrendingUp, CalendarDays, Heart, BookOpen, Stethoscope } from 'lucide-react';
import IllusImage from '../components/IllusImage';
import { loadData, saveData } from '../data/store';
import type { BabyProfile, FeedRecord, SleepRecord, DiaperRecord } from '../data/knowledge';
import { pregnancyWeeks } from '../data/knowledge';

export default function HomePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<BabyProfile | null>(null);
  const [feeds, setFeeds] = useState<FeedRecord[]>([]);
  const [sleeps, setSleeps] = useState<SleepRecord[]>([]);
  const [diapers, setDiapers] = useState<DiaperRecord[]>([]);
  const [mode, setMode] = useState<'pregnancy' | 'baby'>('pregnancy');
  const [pregWeek, setPregWeek] = useState(8);

  useEffect(() => {
    const p = loadData<BabyProfile | null>('baby_profile', null);
    const m = localStorage.getItem('app_mode');
    setProfile(p);
    setMode(m === 'pregnancy' ? 'pregnancy' : p ? 'baby' : 'pregnancy');
    setFeeds(loadData<FeedRecord[]>('feeds', []));
    setSleeps(loadData<SleepRecord[]>('sleeps', []));
    setDiapers(loadData<DiaperRecord[]>('diapers', []));
    setPregWeek(loadData<number>('preg_week', 8));
  }, []);

  const today = () => new Date().toISOString().slice(0, 10);
  const todayFeeds = feeds.filter(f => f.time.startsWith(today()));
  const todaySleep = sleeps.filter(s => s.startTime.startsWith(today()));
  const todayDiapers = diapers.filter(d => d.time.startsWith(today()));

  // Calculate baby age
  const getBabyAge = () => {
    if (!profile?.birthDate) return null;
    const birth = new Date(profile.birthDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    if (diffDays < 30) return `${diffDays}天`;
    const months = Math.floor(diffDays / 30.44);
    const days = Math.floor(diffDays % 30.44);
    return days > 0 ? `${months}个月${days}天` : `${months}个月`;
  };

  const switchMode = (m: 'pregnancy' | 'baby') => {
    setMode(m);
    localStorage.setItem('app_mode', m);
  };

  const currentWeek = pregnancyWeeks.find(w => w.week === pregWeek) || pregnancyWeeks[0];

  return (
    <div>
      {/* Mode Switcher */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={'tab' + (mode === 'pregnancy' ? ' active' : '')} onClick={() => switchMode('pregnancy')}>
          <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />孕期模式
        </button>
        <button className={'tab' + (mode === 'baby' ? ' active' : '')} onClick={() => switchMode('baby')}>
          <Baby size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />宝宝模式
        </button>
      </div>

      {mode === 'pregnancy' ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <IllusImage name="pregnancyHero" size={240} fallback="🤰" />
          </div>
          {/* Pregnancy Dashboard */}
          <div className="card">
            <div className="card-header">
              <span className="card-title"><Heart size={20} color="#ff3b30" /> 孕期进度</span>
              <span className="chip chip-info">孕{pregWeek}周 - 第{currentWeek.trimester === 1 ? '一' : currentWeek.trimester === 2 ? '二' : '三'}孕期</span>
            </div>
            <div className="week-selector">
              <button onClick={() => { const w = Math.max(4, pregWeek - 1); setPregWeek(w); saveData('preg_week', w); }}>
                <span style={{ fontSize: 20 }}>←</span>
              </button>
              <div className="week-display">{pregWeek}周</div>
              <button onClick={() => { const w = Math.min(40, pregWeek + 1); setPregWeek(w); saveData('preg_week', w); }}>
                <span style={{ fontSize: 20 }}>→</span>
              </button>
            </div>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-value">{currentWeek.babySize}</div>
                <div className="stat-label">宝宝大小</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{currentWeek.babyWeight}</div>
                <div className="stat-label">宝宝体重</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12 }}>{currentWeek.tips}</p>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title"><Activity size={20} color="#4a90d9" /> 本周变化</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, marginBottom: 8 }}><strong style={{ color: 'var(--primary)' }}>宝宝发育：</strong>{currentWeek.development}</div>
              <div style={{ fontSize: 13 }}><strong style={{ color: 'var(--primary)' }}>妈妈变化：</strong>{currentWeek.motherChanges}</div>
            </div>
          </div>

          <div className="section-title">孕期工具</div>
          <div className="record-grid">
            <div className="record-card" onClick={() => navigate('/knowledge?tab=diet')}>
              <div className="icon-wrap" style={{ background: '#34c759' }}><BookOpen size={22} /></div>
              <span className="label">饮食指南</span>
            </div>
            <div className="record-card" onClick={() => navigate('/health')}>
              <div className="icon-wrap" style={{ background: '#ff9500' }}><Stethoscope size={22} /></div>
              <span className="label">症状查询</span>
            </div>
            <div className="record-card" onClick={() => navigate('/knowledge?tab=bag')}>
              <div className="icon-wrap" style={{ background: '#5856d6' }}><CalendarDays size={22} /></div>
              <span className="label">待产清单</span>
            </div>
            <div className="record-card" onClick={() => navigate('/knowledge?tab=postpartum')}>
              <div className="icon-wrap" style={{ background: '#ff2d55' }}><Heart size={22} /></div>
              <span className="label">产后恢复</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Baby Dashboard */}
<div style={{ textAlign: 'center', marginBottom: 12 }}>
            <IllusImage name="babyHero" size={240} fallback="👶" />
          </div>
          {profile ? (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><Baby size={20} color="#4a90d9" /> {profile.name || '宝宝'}</span>
                <span className="age-pill">{getBabyAge()}</span>
              </div>
              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-value">{todayFeeds.length}</div>
                  <div className="stat-label">今日喂养</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{Math.round(todaySleep.reduce((s, r) => s + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()) / 3600000, 0) * 10) / 10}h</div>
                  <div className="stat-label">今日睡眠</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{todayDiapers.length}</div>
                  <div className="stat-label">今日尿布</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 24 }}>
              <IllusImage name="babyProfileEmpty" size={160} fallback="👣" />
              <IllusImage name="babyProfileEmpty" size={160} fallback="👣" />
            <p style={{ marginTop: 12, marginBottom: 12, color: 'var(--text-secondary)' }}>还没有添加宝宝信息</p>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/baby')}>添加宝宝</button>
            </div>
          )}

          <div className="section-title">快速记录</div>
          <div className="record-grid">
            <div className="record-card" onClick={() => navigate('/baby/record/feed')}>
              <div className="icon-wrap" style={{ background: '#4a90d9' }}><Droplets size={22} /></div>
              <span className="label">喂养</span>
            </div>
            <div className="record-card" onClick={() => navigate('/baby/record/sleep')}>
              <div className="icon-wrap" style={{ background: '#5856d6' }}><Moon size={22} /></div>
              <span className="label">睡眠</span>
            </div>
            <div className="record-card" onClick={() => navigate('/baby/record/diaper')}>
              <div className="icon-wrap" style={{ background: '#34c759' }}><Activity size={22} /></div>
              <span className="label">尿布</span>
            </div>
            <div className="record-card" onClick={() => navigate('/baby/record/growth')}>
              <div className="icon-wrap" style={{ background: '#ff9500' }}><TrendingUp size={22} /></div>
              <span className="label">生长</span>
            </div>
          </div>

          {profile && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><Clock size={20} color="#34c759" /> 今日记录</span>
              </div>
              {todayFeeds.length === 0 && todaySleep.length === 0 && todayDiapers.length === 0 ? (
                <div className="empty-state"><IllusImage name="emptyRecords" size={100} fallback="📝" /><p style={{ marginTop: 8 }}>今天还没有记录</p></div>
              ) : (
                <div className="timeline">
                  {[...todayFeeds, ...todaySleep.map(s => ({ ...s, __type: 'sleep' })), ...todayDiapers.map(d => ({ ...d, __type: 'diaper' }))]
                    .sort((a, b) => new Date(b.time || (b as any).startTime || '').getTime() - new Date(a.time || (a as any).startTime || '').getTime())
                    .slice(0, 10)
                    .map((item: any, i) => (
                      <div className="timeline-item" key={i}>
                        <span className="timeline-time">{new Date(item.time || item.startTime || '').toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="timeline-content">
                          {item.__type === 'sleep' ? '😴 ' + (Math.round((new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) / 60000)) + '分钟' :
                           item.__type === 'diaper' ? (item.type === 'wet' ? '💧 小便' : item.type === 'dirty' ? '💩 大便' : '💧💩 混合') :
                           item.type === 'breast' ? '🤱 母乳' + (item.side ? ' (' + (item.side === 'left' ? '左' : '右') + ')' : '') + ' ' + (item.duration || '') + '分钟' :
                           '🍼 配方奶 ' + (item.amount || '') + 'ml'}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
