import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Baby, Droplets, Moon, Activity, Plus, Clock, TrendingUp, Trash2, Play, Pause } from 'lucide-react';
import { loadData, saveData, generateId } from '../data/store';
import type { BabyProfile, FeedRecord, SleepRecord, DiaperRecord, GrowthRecord } from '../data/knowledge';
import { feedingGuide, easyRoutines } from '../data/knowledge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BabyCarePage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<BabyProfile | null>(() => loadData<BabyProfile | null>('baby_profile', null));
  const [feeds, setFeeds] = useState<FeedRecord[]>(() => loadData<FeedRecord[]>('feeds', []));
  const [sleeps, setSleeps] = useState<SleepRecord[]>(() => loadData<SleepRecord[]>('sleeps', []));
  const [diapers, setDiapers] = useState<DiaperRecord[]>(() => loadData<DiaperRecord[]>('diapers', []));
  const [growths, setGrowths] = useState<GrowthRecord[]>(() => loadData<GrowthRecord[]>('growths', []));
  const [tab, setTab] = useState<string>(type || 'profile');

  // Profile form
  const [editName, setEditName] = useState(profile?.name || '');
  const [editBirth, setEditBirth] = useState(profile?.birthDate || new Date().toISOString().slice(0, 10));
  const [editGender, setEditGender] = useState(profile?.gender || '');

  // Feed form
  const [feedType, setFeedType] = useState<'breast' | 'formula'>('breast');
  const [feedSide, setFeedSide] = useState<'left' | 'right'>('left');
  const [feedDuration, setFeedDuration] = useState(15);
  const [feedAmount, setFeedAmount] = useState(120);
  const [feedTime, setFeedTime] = useState(new Date().toISOString().slice(0, 16));

  // Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timerSide, setTimerSide] = useState<'left' | 'right'>('left');
  const [showForm, setShowForm] = useState(false);

  // Sleep form
  const [sleepStart, setSleepStart] = useState(new Date().toISOString().slice(0, 16));
  const [sleepEnd, setSleepEnd] = useState(() => {
    const d = new Date(); d.setHours(d.getHours() + 1);
    return d.toISOString().slice(0, 16);
  });
  const [sleepQuality, setSleepQuality] = useState<'good' | 'fair' | 'poor'>('good');

  // Diaper form
  const [diaperType, setDiaperType] = useState<'wet' | 'dirty' | 'both'>('wet');
  const [diaperTime, setDiaperTime] = useState(new Date().toISOString().slice(0, 16));

  // Growth form
  const [growthDate, setGrowthDate] = useState(new Date().toISOString().slice(0, 10));
  const [growthWeight, setGrowthWeight] = useState('');
  const [growthHeight, setGrowthHeight] = useState('');
  const [growthHead, setGrowthHead] = useState('');

  
  useEffect(() => {
    if (type) setTab(type);
    const interval = setInterval(() => {
      if (timerRunning && timerStart) {
        setTimerElapsed(Math.floor((Date.now() - timerStart) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [type, timerRunning, timerStart]);

  const saveProfile = () => {
    const p: BabyProfile = { name: editName, birthDate: editBirth, gender: editGender };
    setProfile(p);
    saveData('baby_profile', p);
  };

  const addFeed = () => {
    const record: FeedRecord = {
      id: generateId(),
      time: feedTime,
      type: feedType,
      ...(feedType === 'breast' ? { side: feedSide, duration: feedDuration } : { amount: feedAmount }),
    };
    const updated = [record, ...feeds];
    setFeeds(updated);
    saveData('feeds', updated);
    setShowForm(false);
    navigate('/baby');
  };

  const addSleep = () => {
    const record: SleepRecord = { id: generateId(), startTime: sleepStart, endTime: sleepEnd, quality: sleepQuality };
    const updated = [record, ...sleeps];
    setSleeps(updated);
    saveData('sleeps', updated);
    setShowForm(false);
    navigate('/baby');
  };

  const addDiaper = () => {
    const record: DiaperRecord = { id: generateId(), time: diaperTime, type: diaperType };
    const updated = [record, ...diapers];
    setDiapers(updated);
    saveData('diapers', updated);
    setShowForm(false);
    navigate('/baby');
  };

  const addGrowth = () => {
    const record: GrowthRecord = {
      id: generateId(),
      date: growthDate,
      weight: parseFloat(growthWeight),
      height: parseFloat(growthHeight),
      headCirc: parseFloat(growthHead),
    };
    const updated = [record, ...growths].sort((a, b) => a.date.localeCompare(b.date));
    setGrowths(updated);
    saveData('growths', updated);
    setShowForm(false);
    navigate('/baby');
  };

  const deleteRecord = (type: string, id: string) => {
    if (type === 'feed') { const u = feeds.filter(f => f.id !== id); setFeeds(u); saveData('feeds', u); }
    else if (type === 'sleep') { const u = sleeps.filter(s => s.id !== id); setSleeps(u); saveData('sleeps', u); }
    else if (type === 'diaper') { const u = diapers.filter(d => d.id !== id); setDiapers(u); saveData('diapers', u); }
    else if (type === 'growth') { const u = growths.filter(g => g.id !== id); setGrowths(u); saveData('growths', u); }
  };

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  };

  const timerHandler = () => {
    if (timerRunning) {
      setTimerRunning(false);
      setFeedDuration(Math.floor(timerElapsed / 60));
    } else {
      setTimerStart(Date.now() - timerElapsed * 1000);
      setTimerRunning(true);
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const todayFeeds = feeds.filter(f => f.time.startsWith(today));
  const todaySleep = sleeps.filter(s => s.startTime.startsWith(today));
  const todayDiapers = diapers.filter(d => d.time.startsWith(today));

  // Render if showing a form
  if (type && type !== tab) setTab(type);

  // Show record form modal
  if (tab === 'feed' || tab === 'sleep' || tab === 'diaper' || tab === 'growth') {
    return <RecordModal />;
  }

  return (
    <div>
      {!profile ? (
        <div className="card">
          <div className="card-header"><span className="card-title"><Baby size={20} /> 添加宝宝信息</span></div>
          <div className="form-group">
            <label className="form-label">宝宝名字/昵称</label>
            <input className="form-input" value={editName} onChange={e => setEditName(e.target.value)} placeholder="如：小豆豆" />
          </div>
          <div className="form-group">
            <label className="form-label">出生日期</label>
            <input className="form-input" type="date" value={editBirth} onChange={e => setEditBirth(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">性别</label>
            <select className="form-select" value={editGender} onChange={e => setEditGender(e.target.value)}>
              <option value="">请选择</option>
              <option value="male">男孩</option>
              <option value="female">女孩</option>
            </select>
          </div>
          <button className="btn btn-primary btn-block" onClick={saveProfile} disabled={!editName}>保存</button>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="tabs">
            <button className={'tab' + (tab === 'overview' ? ' active' : '')} onClick={() => setTab('overview')}>概览</button>
            <button className={'tab' + (tab === 'feed' ? ' active' : '')} onClick={() => setTab('feed')}>喂养</button>
            <button className={'tab' + (tab === 'sleep' ? ' active' : '')} onClick={() => setTab('sleep')}>睡眠</button>
            <button className={'tab' + (tab === 'diaper' ? ' active' : '')} onClick={() => setTab('diaper')}>尿布</button>
            <button className={'tab' + (tab === 'growth' ? ' active' : '')} onClick={() => setTab('growth')}>生长</button>
          </div>

          {/* Overview */}
          <TabOverview tab={tab} />
          <FeedTab tab={tab} />
          <SleepTab tab={tab} />
          <DiaperTab tab={tab} />
          <GrowthTab tab={tab} />
        </>
      )}
    </div>
  );

  // Sub-components below
  function RecordModal() {
    return (
      <div>
        {tab === 'feed' && (
          <div className="card">
            <div className="card-header">
              <span className="card-title"><Droplets size={20} color="#4a90d9" /> 记录喂养</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/baby')}>← 返回</button>
            </div>
            {/* Feed Timer */}
            <div className="timer-display" style={{ background: '#f0f5ff', borderRadius: 12, margin: '12px 0' }}>
              <div style={{ fontSize: 13, color: 'var(--primary)', marginBottom: 8 }}>
                {timerSide === 'left' ? '左侧' : '右侧'} 哺乳计时
              </div>
              <div>{formatDuration(timerElapsed)}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                <button className="btn btn-primary btn-sm" onClick={() => { setTimerSide('left'); timerHandler(); }}>
                  {timerRunning ? <Pause size={16} /> : <Play size={16} />}
                  {timerRunning ? '暂停' : timerSide === 'left' ? '开始左侧' : '开始'}
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => { setTimerSide('right'); if (!timerRunning) { setTimerStart(Date.now() - timerElapsed * 1000); setTimerRunning(true); } }}>
                  切右侧
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">喂养方式</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={'btn btn-sm ' + (feedType === 'breast' ? 'btn-primary' : 'btn-secondary')} onClick={() => setFeedType('breast')}>🤱 母乳</button>
                <button className={'btn btn-sm ' + (feedType === 'formula' ? 'btn-primary' : 'btn-secondary')} onClick={() => setFeedType('formula')}>🍼 配方奶</button>
              </div>
            </div>
            {feedType === 'breast' ? (
              <>
                <div className="form-group">
                  <label className="form-label">哺乳侧</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className={'btn btn-sm ' + (feedSide === 'left' ? 'btn-primary' : 'btn-secondary')} onClick={() => setFeedSide('left')}>左</button>
                    <button className={'btn btn-sm ' + (feedSide === 'right' ? 'btn-primary' : 'btn-secondary')} onClick={() => setFeedSide('right')}>右</button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">时长 (分钟)</label>
                  <input className="form-input" type="number" value={feedDuration} onChange={e => setFeedDuration(Number(e.target.value))} min={1} max={120} />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label className="form-label">奶量 (毫升)</label>
                <input className="form-input" type="number" value={feedAmount} onChange={e => setFeedAmount(Number(e.target.value))} min={10} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">时间</label>
              <input className="form-input" type="datetime-local" value={feedTime} onChange={e => setFeedTime(e.target.value)} />
            </div>
            <button className="btn btn-primary btn-block" onClick={addFeed}>保存记录</button>
          </div>
        )}

        {tab === 'sleep' && (
          <div className="card">
            <div className="card-header">
              <span className="card-title"><Moon size={20} color="#5856d6" /> 记录睡眠</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/baby')}>← 返回</button>
            </div>
            <div className="form-group">
              <label className="form-label">入睡时间</label>
              <input className="form-input" type="datetime-local" value={sleepStart} onChange={e => setSleepStart(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">醒来时间</label>
              <input className="form-input" type="datetime-local" value={sleepEnd} onChange={e => setSleepEnd(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">睡眠质量</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['good', 'fair', 'poor'] as const).map(q => (
                  <button key={q} className={'btn btn-sm ' + (sleepQuality === q ? 'btn-primary' : 'btn-secondary')} onClick={() => setSleepQuality(q)}>
                    {q === 'good' ? '😊 好' : q === 'fair' ? '😐 一般' : '😣 差'}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={addSleep}>保存记录</button>
          </div>
        )}

        {tab === 'diaper' && (
          <div className="card">
            <div className="card-header">
              <span className="card-title"><Activity size={20} color="#34c759" /> 记录尿布</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/baby')}>← 返回</button>
            </div>
            <div className="form-group">
              <label className="form-label">类型</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['wet', 'dirty', 'both'] as const).map(t => (
                  <button key={t} className={'btn btn-sm ' + (diaperType === t ? 'btn-primary' : 'btn-secondary')} onClick={() => setDiaperType(t)}>
                    {t === 'wet' ? '💧 小便' : t === 'dirty' ? '💩 大便' : '💧💩 混合'}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">时间</label>
              <input className="form-input" type="datetime-local" value={diaperTime} onChange={e => setDiaperTime(e.target.value)} />
            </div>
            <button className="btn btn-primary btn-block" onClick={addDiaper}>保存记录</button>
          </div>
        )}

        {tab === 'growth' && (
          <div className="card">
            <div className="card-header">
              <span className="card-title"><TrendingUp size={20} color="#ff9500" /> 记录生长</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/baby')}>← 返回</button>
            </div>
            <div className="form-group">
              <label className="form-label">日期</label>
              <input className="form-input" type="date" value={growthDate} onChange={e => setGrowthDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">体重 (公斤)</label>
              <input className="form-input" type="number" step="0.01" value={growthWeight} onChange={e => setGrowthWeight(e.target.value)} placeholder="如：6.5" />
            </div>
            <div className="form-group">
              <label className="form-label">身长 (厘米)</label>
              <input className="form-input" type="number" step="0.1" value={growthHeight} onChange={e => setGrowthHeight(e.target.value)} placeholder="如：66.5" />
            </div>
            <div className="form-group">
              <label className="form-label">头围 (厘米)</label>
              <input className="form-input" type="number" step="0.1" value={growthHead} onChange={e => setGrowthHead(e.target.value)} placeholder="如：42" />
            </div>
            <button className="btn btn-primary btn-block" onClick={addGrowth}>保存记录</button>
          </div>
        )}
      </div>
    );
  }

  function TabOverview({ tab }: { tab: string }) {
    if (tab !== 'overview') return null;
    return (
      <>
        <div className="record-grid">
          <div className="record-card" onClick={() => navigate('/baby/record/feed')}>
            <div className="icon-wrap" style={{ background: '#4a90d9' }}><Droplets size={22} /></div>
            <span className="label">记录喂养</span>
          </div>
          <div className="record-card" onClick={() => navigate('/baby/record/sleep')}>
            <div className="icon-wrap" style={{ background: '#5856d6' }}><Moon size={22} /></div>
            <span className="label">记录睡眠</span>
          </div>
          <div className="record-card" onClick={() => navigate('/baby/record/diaper')}>
            <div className="icon-wrap" style={{ background: '#34c759' }}><Activity size={22} /></div>
            <span className="label">记录尿布</span>
          </div>
          <div className="record-card" onClick={() => navigate('/baby/record/growth')}>
            <div className="icon-wrap" style={{ background: '#ff9500' }}><TrendingUp size={22} /></div>
            <span className="label">记录生长</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title"><Clock size={18} /> 今日统计</span></div>
          <div className="stats-row" style={{ marginBottom: 12 }}>
            <div className="stat-item"><div className="stat-value">{todayFeeds.length}</div><div className="stat-label">喂养</div></div>
            <div className="stat-item"><div className="stat-value">{todaySleep.length}</div><div className="stat-label">睡眠</div></div>
            <div className="stat-item"><div className="stat-value">{todayDiapers.length}</div><div className="stat-label">尿布</div></div>
            <div className="stat-item"><div className="stat-value">{Math.round(todaySleep.reduce((s, r) => s + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()) / 3600000, 0) * 10) / 10}h</div><div className="stat-label">睡眠总长</div></div>
          </div>
          {todayFeeds.length === 0 && todaySleep.length === 0 && todayDiapers.length === 0 && (
            <div className="empty-state"><p>今天还没有记录，点击上方按钮开始</p></div>
          )}
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">📋 E.A.S.Y. 参考</span></div>
          {easyRoutines.map((r, i) => (
            <div key={i} style={{ fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <strong>{r.age}：</strong>E {r.eat} | A {r.activity} | S {r.sleep}
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">🍼 喂养参考</span></div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <p><strong>母乳频率：</strong>{feedingGuide.breastfeeding.frequency_newborn}</p>
            <p><strong>饥饿信号：</strong>{feedingGuide.breastfeeding.hunger_signals}</p>
            <p><strong>吃饱信号：</strong>{feedingGuide.breastfeeding.enough_signals}</p>
            <p style={{ marginTop: 8 }}><strong>辅食引入：</strong>{feedingGuide.solids.when} - 首选{feedingGuide.solids.first}</p>
            <p><strong>1岁前不吃：</strong>{feedingGuide.solids.avoid}</p>
          </div>
        </div>
      </>
    );
  }

  function FeedTab({ tab }: { tab: string }) {
    if (tab !== 'feed') return null;
    const last7 = [...Array(7)].map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() - i);
      return d.toISOString().slice(0, 10);
    }).reverse();
    return (
      <div>
        <button className="btn btn-primary btn-block" style={{ marginBottom: 12 }} onClick={() => navigate('/baby/record/feed')}>
          <Plus size={16} /> 记录喂养
        </button>
        {feeds.slice(0, 30).map(f => (
          <div className="card" key={f.id} style={{ padding: '10px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: 14 }}>
                  {f.type === 'breast' ? '🤱 母乳' : '🍼 配方奶'}
                  {f.type === 'breast' && f.side ? ` (${f.side === 'left' ? '左' : '右'}, ${f.duration}分钟)` : ''}
                  {f.type === 'formula' ? ` ${f.amount}ml` : ''}
                </span>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {new Date(f.time).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <button style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer' }} onClick={() => deleteRecord('feed', f.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {feeds.length === 0 && <div className="empty-state"><p>暂无喂养记录</p></div>}
      </div>
    );
  }

  function SleepTab({ tab }: { tab: string }) {
    if (tab !== 'sleep') return null;
    return (
      <div>
        <button className="btn btn-primary btn-block" style={{ marginBottom: 12 }} onClick={() => navigate('/baby/record/sleep')}>
          <Plus size={16} /> 记录睡眠
        </button>
        {sleeps.slice(0, 30).map(s => {
          const duration = Math.round((new Date(s.endTime).getTime() - new Date(s.startTime).getTime()) / 60000);
          const d = new Date(s.startTime);
          return (
            <div className="card" key={s.id} style={{ padding: '10px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>
                    😴 {duration}分钟 {s.quality === 'good' ? '😊' : s.quality === 'fair' ? '😐' : '😣'}
                  </span>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {d.toLocaleDateString('zh-CN')} {d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    {' → '}
                    {new Date(s.endTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <button style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer' }} onClick={() => deleteRecord('sleep', s.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {sleeps.length === 0 && <div className="empty-state"><p>暂无睡眠记录</p></div>}
      </div>
    );
  }

  function DiaperTab({ tab }: { tab: string }) {
    if (tab !== 'diaper') return null;
    return (
      <div>
        <button className="btn btn-primary btn-block" style={{ marginBottom: 12 }} onClick={() => navigate('/baby/record/diaper')}>
          <Plus size={16} /> 记录尿布
        </button>
        {diapers.slice(0, 30).map(d => (
          <div className="card" key={d.id} style={{ padding: '10px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: 14 }}>
                  {d.type === 'wet' ? '💧 小便' : d.type === 'dirty' ? '💩 大便' : '💧💩 混合'}
                </span>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {new Date(d.time).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <button style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer' }} onClick={() => deleteRecord('diaper', d.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {diapers.length === 0 && <div className="empty-state"><p>暂无尿布记录</p></div>}
      </div>
    );
  }

  function GrowthTab({ tab }: { tab: string }) {
    if (tab !== 'growth') return null;
    const chartData = growths.map(g => ({ date: g.date, weight: g.weight, height: g.height }));
    return (
      <div>
        <button className="btn btn-primary btn-block" style={{ marginBottom: 12 }} onClick={() => navigate('/baby/record/growth')}>
          <Plus size={16} /> 记录生长
        </button>
        {chartData.length > 1 && (
          <div className="card">
            <div className="card-header"><span className="card-title">体重曲线</span></div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#4a90d9" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {chartData.length > 1 && (
          <div className="card">
            <div className="card-header"><span className="card-title">身长曲线</span></div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="height" stroke="#34c759" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {growths.slice(0, 20).map(g => (
          <div className="card" key={g.id} style={{ padding: '10px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{g.date}</span>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {g.weight}kg | {g.height}cm | {g.headCirc}cm
                </div>
              </div>
              <button style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer' }} onClick={() => deleteRecord('growth', g.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {growths.length === 0 && <div className="empty-state"><p>暂无生长记录</p></div>}
      </div>
    );
  }
}
