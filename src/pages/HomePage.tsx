import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, Droplets, Moon, Activity, TrendingUp, Heart, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { loadData, saveData } from '../data/store';
import type { BabyProfile, FeedRecord, SleepRecord, DiaperRecord, GrowthRecord } from '../data/knowledge';
import { pregnancyWeeks } from '../data/knowledge';
import IllusImage from '../components/IllusImage';
import { generateAdvice, AdviceCard } from '../components/DynamicAdvice';
import DailyPlan from '../components/DailyPlan';

export default function HomePage() {
  const navigate = useNavigate();
  const [profile] = useState<BabyProfile | null>(() => loadData<BabyProfile | null>('baby_profile', null));
  const [feeds] = useState<FeedRecord[]>(() => loadData<FeedRecord[]>('feeds', []));
  const [sleeps] = useState<SleepRecord[]>(() => loadData<SleepRecord[]>('sleeps', []));
  const [diapers] = useState<DiaperRecord[]>(() => loadData<DiaperRecord[]>('diapers', []));
  const [growths] = useState<GrowthRecord[]>(() => loadData<GrowthRecord[]>('growths', []));
  const [mode, setMode] = useState<'pregnancy' | 'baby'>(() => (localStorage.getItem('app_mode') as any) || 'pregnancy');
  const [pregWeek, setPregWeek] = useState(() => loadData<number>('preg_week', 8));
  const [showAdvice, setShowAdvice] = useState(false);

  const today = () => new Date().toISOString().slice(0, 10);
  const todayFeeds = feeds.filter(f => f.time.startsWith(today()));
  const todaySleep = sleeps.filter(s => s.startTime.startsWith(today()));
  const todayDiapers = diapers.filter(d => d.time.startsWith(today()));
  const totalSleepH = Math.round(todaySleep.reduce((s, r) => s + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()) / 3600000, 0) * 10) / 10;

  const getBabyAge = () => {
    if (!profile?.birthDate) return null;
    const birth = new Date(profile.birthDate);
    const diffDays = Math.floor((Date.now() - birth.getTime()) / 86400000);
    if (isNaN(diffDays)) return null;
    if (diffDays < 30) return `${diffDays}天`;
    const months = Math.floor(diffDays / 30.44);
    const days = Math.floor(diffDays % 30.44);
    return days > 0 ? `${months}个月${days}天` : `${months}个月`;
  };
  const getBabyAgeMonths = () => {
    if (!profile?.birthDate) return 0;
    const birth = new Date(profile.birthDate);
    return Math.floor((Date.now() - birth.getTime()) / (30.44 * 86400000));
  };

  const switchMode = (m: 'pregnancy' | 'baby') => { setMode(m); localStorage.setItem('app_mode', m); };

  const currentWeek = pregnancyWeeks.find(w => w.week === pregWeek) || pregnancyWeeks[0];
  const advices = profile ? generateAdvice({ profile, feeds, sleeps, growths }) : [];
  
  return (
    <div>
      {/* === Mode Switcher (compact pill) === */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', background: 'var(--border)', borderRadius: 24, padding: 3 }}>
          <button onClick={() => switchMode('pregnancy')} style={{
            padding: '6px 18px', borderRadius: 22, border: 'none', fontSize: 13, fontWeight: mode === 'pregnancy' ? 600 : 400,
            background: mode === 'pregnancy' ? 'var(--card)' : 'transparent', color: mode === 'pregnancy' ? 'var(--text)' : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: mode === 'pregnancy' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
          }}>
            <Heart size={13} style={{ verticalAlign: 'middle', marginRight: 4, color: 'var(--danger)' }} />
            孕期
          </button>
          <button onClick={() => switchMode('baby')} style={{
            padding: '6px 18px', borderRadius: 22, border: 'none', fontSize: 13, fontWeight: mode === 'baby' ? 600 : 400,
            background: mode === 'baby' ? 'var(--card)' : 'transparent', color: mode === 'baby' ? 'var(--text)' : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: mode === 'baby' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
          }}>
            <Baby size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            宝宝
          </button>
        </div>
      </div>

      {/* === PREGNANCY MODE === */}
      {mode === 'pregnancy' && (
        <>
          {/* Week card */}
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="week-selector">
              <button onClick={() => { const w = Math.max(4, pregWeek - 1); setPregWeek(w); saveData('preg_week', w); }}>←</button>
              <div className="week-display">{pregWeek}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 4 }}>周</span></div>
              <button onClick={() => { const w = Math.min(40, pregWeek + 1); setPregWeek(w); saveData('preg_week', w); }}>→</button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
              第{currentWeek.trimester === 1 ? '一' : currentWeek.trimester === 2 ? '二' : '三'}孕期 · {currentWeek.babySize}大小 · {currentWeek.babyWeight}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--text-secondary)', textAlign: 'left' }}>
              <p style={{ marginBottom: 4 }}><strong>🧬</strong> {currentWeek.development}</p>
              <p style={{ marginBottom: 4 }}><strong>🤰</strong> {currentWeek.motherChanges}</p>
              <p style={{ marginBottom: 4 }}><strong>💡</strong> {currentWeek.tips}</p>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate('/grow')} style={{ marginTop: 8 }}>
              查看完整周历 →
            </button>
          </div>

          {/* Quick links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
            <button className="btn btn-secondary" onClick={() => navigate('/learn')} style={{ fontSize: 12, justifyContent: 'flex-start', gap: 6 }}>
              孕期食谱
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/learn')} style={{ fontSize: 12, justifyContent: 'flex-start', gap: 6 }}>
              待产清单
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/health')} style={{ fontSize: 12, justifyContent: 'flex-start', gap: 6 }}>
              症状查询
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/learn')} style={{ fontSize: 12, justifyContent: 'flex-start', gap: 6 }}>
              产后恢复
            </button>
          </div>
        </>
      )}

      {/* === BABY MODE === */}
      {mode === 'baby' && (
        <>
          {!profile ? (
            /* Empty state */
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <IllusImage name="babyProfileEmpty" size={140} fallback="👣" />
              <p style={{ margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13 }}>添加宝宝信息开始记录</p>
              <button className="btn btn-sm btn-primary" onClick={() => navigate('/track')}>添加宝宝 →</button>
            </div>
          ) : (
            <>
              {/* Today's stats */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{profile.name || '宝宝'}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{getBabyAge()}</div>
                  </div>
                  <button className="btn btn-sm btn-secondary" onClick={() => navigate('/track')}>全部记录 →</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, textAlign: 'center' }}>
                  <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 4px' }}>
                    <div style={{ fontSize: 20, fontWeight: 680 }}>{todayFeeds.length}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>喂养</div>
                  </div>
                  <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 4px' }}>
                    <div style={{ fontSize: 20, fontWeight: 680 }}>{totalSleepH}h</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>睡眠</div>
                  </div>
                  <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 4px' }}>
                    <div style={{ fontSize: 20, fontWeight: 680 }}>{todayDiapers.length}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>尿布</div>
                  </div>
                  <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 4px' }}>
                    <div style={{ fontSize: 20, fontWeight: 680 }}>{getBabyAgeMonths()}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>月龄</div>
                  </div>
                </div>
              </div>

              {/* Quick record actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { icon: Droplets, label: '喂养', color: '#D4956A', path: '/track/record/feed' },
                  { icon: Moon, label: '睡眠', color: '#9B8E7E', path: '/track/record/sleep' },
                  { icon: Activity, label: '尿布', color: '#8FAF7E', path: '/track/record/diaper' },
                  { icon: TrendingUp, label: '生长', color: '#D4A85C', path: '/track/record/growth' },
                ].map(item => (
                  <button key={item.label} onClick={() => navigate(item.path)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '14px 8px', borderRadius: 14, border: 'none', background: 'var(--card)',
                    cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', transition: 'all 0.15s ease',
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={20} color="#fff" />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 540, color: 'var(--text)' }}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Daily plan (baby mode only) */}
              <DailyPlan babyAgeMonths={getBabyAgeMonths()} apiKey={loadData<string>('deepseek_key', '')} />

              {/* Smart advice (collapsible) */}
              {advices.length > 0 && (
                <div>
                  <button onClick={() => setShowAdvice(!showAdvice)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '10px 0', border: 'none', background: 'none',
                    cursor: 'pointer', fontSize: 13, fontWeight: 540, color: 'var(--text-secondary)',
                  }}>
                    <span><Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 4, color: 'var(--accent)' }} />智能建议</span>
                    {showAdvice ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {showAdvice && <AdviceCard advice={advices} />}
                </div>
              )}

              {/* Recent timeline */}
              {todayFeeds.length > 0 && (
                <div className="card" style={{ marginTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--text-muted)' }}>今日记录</div>
                  {[...todayFeeds, ...todaySleep.map(s => ({ ...s, __type: 'sleep' as const })), ...todayDiapers.map(d => ({ ...d, __type: 'diaper' as const }))]
                    .sort((a: any, b: any) => new Date(b.time || b.startTime || '').getTime() - new Date(a.time || a.startTime || '').getTime())
                    .slice(0, 8).map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < 7 ? '0.5px solid var(--border)' : 'none', fontSize: 12 }}>
                        <span style={{ color: 'var(--text-muted)', minWidth: 38, fontVariantNumeric: 'tabular-nums' }}>
                          {new Date(item.time || item.startTime || '').toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>
                          {item.__type === 'sleep' ? '😴 ' + Math.round((new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) / 60000) + '分钟' :
                           item.__type === 'diaper' ? (item.type === 'wet' ? '💧 小便' : item.type === 'dirty' ? '💩 大便' : '💧💩 混合') :
                           item.type === 'breast' ? '🤱 母乳' + (item.side ? ' ' + (item.side === 'left' ? '左' : '右') : '') + ' ' + (item.duration || '') + '分钟' :
                           '🍼 配方奶 ' + (item.amount || '') + 'ml'}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
