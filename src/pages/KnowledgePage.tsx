import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Baby, CalendarCheck, ChevronDown, ChevronUp, Heart, HeartPulse, MessageCircle,
  Milk, Moon, ShoppingBag, Stethoscope, UtensilsCrossed,
} from 'lucide-react';
import {
  pregnancyNutrients, pregnancyDietGuide, hospitalBagList, postpartumRecovery,
  feedingGuide, babySleepGuide, sleepTrainingMethods, easyRoutines, babyCareGuide, babyCareByMonth,
} from '../data/knowledge';
import {
  breastmilkStorage, newbornCareBasics, breastfeedingChecklist, engorgementCare, blockedDuctCare, mastitisSigns,
} from '../data/recipes';
import Checklist from '../components/Checklist';
import KnowledgeChat from '../components/KnowledgeChat';
import HealthPage from './HealthPage';

const pregnancyTabs = [
  { id: 'diet', label: '孕期饮食', icon: Heart },
  { id: 'bag', label: '待产清单', icon: ShoppingBag },
  { id: 'postpartum', label: '产后恢复', icon: HeartPulse },
];

const babyTabs = [
  { id: 'babycare', label: '宝宝护理', icon: Baby },
  { id: 'feeding', label: '喂养', icon: UtensilsCrossed },
  { id: 'sleep', label: '睡眠', icon: Moon },
  { id: 'breastmilk', label: '母乳', icon: Milk },
  { id: 'easy', label: 'E.A.S.Y.', icon: CalendarCheck },
  { id: 'health', label: '健康', icon: Stethoscope },
];

export default function KnowledgePage() {
  const [searchParams] = useSearchParams();
  const [currentMode, setCurrentMode] = useState<'pregnancy' | 'baby'>(() =>
    localStorage.getItem('app_mode') === 'baby' ? 'baby' : 'pregnancy'
  );
  const [tab, setTab] = useState(() => {
    const urlTab = searchParams.get('tab');
    const allowed = currentMode === 'pregnancy' ? pregnancyTabs : babyTabs;
    if (urlTab && allowed.some(t => t.id === urlTab)) return urlTab;
    return currentMode === 'pregnancy' ? 'diet' : 'babycare';
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  // 切换孕期/宝宝模式时，知识内容与标签完全跟随当前模式
  useEffect(() => {
    const h = () => {
      const m = localStorage.getItem('app_mode') === 'baby' ? 'baby' : 'pregnancy';
      setCurrentMode(m);
      setTab(m === 'pregnancy' ? 'diet' : 'babycare');
    };
    window.addEventListener('modeChange', h);
    return () => window.removeEventListener('modeChange', h);
  }, []);

  // 支持从首页快捷入口直达具体标签（如待产清单、产后恢复）
  useEffect(() => {
    const urlTab = searchParams.get('tab');
    const allowed = currentMode === 'pregnancy' ? pregnancyTabs : babyTabs;
    if (urlTab && allowed.some(t => t.id === urlTab)) setTab(urlTab);
  }, [searchParams, currentMode]);

  const tabs = currentMode === 'pregnancy' ? pregnancyTabs : babyTabs;

  return (
    <div>
      {showChat && <KnowledgeChat onClose={() => setShowChat(false)} />}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: 'fixed', bottom: 100, right: 16, zIndex: 150,
          width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)',
          color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <MessageCircle size={22} />
      </button>

      <div className="tabs" style={{ flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} className={'tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
            <t.icon size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'diet' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title"><Heart size={18} /> 孕期饮食原则</span></div>
            {pregnancyDietGuide.basics.map((b, i) => (
              <div key={i} style={{ padding: '6px 0', fontSize: 13, borderBottom: '1px solid var(--border)' }}>
                <strong>{b.principle}：</strong>{b.detail}
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">关键营养素</span></div>
            {pregnancyNutrients.map((n, i) => (
              <div className="accordion" key={i}>
                <div className="accordion-header" onClick={() => toggle('nut-' + i)}>
                  <span>{n.name}</span>
                  {expanded === 'nut-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'nut-' + i && (
                  <div className="accordion-body">
                    <p><strong>RDA：</strong>{n.rda}</p>
                    <p><strong>功能：</strong>{n.function_embryo}</p>
                    <p><strong>来源：</strong>{n.sources}</p>
                    {n.risk && <p style={{ color: 'var(--danger)' }}><strong>缺乏风险：</strong>{n.risk}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'feeding' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title">母乳喂养</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>频率：</strong>{feedingGuide.breastfeeding.frequency_newborn}</p>
              <p><strong>时长：</strong>{feedingGuide.breastfeeding.duration}</p>
              <p><strong>饥饿信号：</strong>{feedingGuide.breastfeeding.hunger_signals}</p>
              <p><strong>吃饱信号：</strong>{feedingGuide.breastfeeding.enough_signals}</p>
              <p><strong>储存：</strong>{feedingGuide.breastfeeding.storage}</p>
              <p><strong>姿势：</strong>{feedingGuide.breastfeeding.positions.join('、')}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">配方喂养</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>冲泡：</strong>{feedingGuide.formula.preparation}</p>
              <p><strong>用量：</strong>{feedingGuide.formula.amount}</p>
              <p><strong>安全：</strong>{feedingGuide.formula.safety}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">辅食添加</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>时机：</strong>{feedingGuide.solids.when}</p>
              <p><strong>首选：</strong>{feedingGuide.solids.first}</p>
              <p><strong>顺序：</strong>{feedingGuide.solids.order}</p>
              <p><strong>避免：</strong>{feedingGuide.solids.avoid}</p>
              <p><strong>分量：</strong></p>
              <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>{feedingGuide.solids.portions}</pre>
            </div>
          </div>
        </div>
      )}

      {tab === 'sleep' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title">各阶段睡眠指南</span></div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '4px' }}>月龄</th>
                    <th style={{ padding: '4px' }}>总睡眠</th>
                    <th style={{ padding: '4px' }}>小睡</th>
                    <th style={{ padding: '4px' }}>夜间</th>
                    <th style={{ padding: '4px' }}>要点</th>
                  </tr>
                </thead>
                <tbody>
                  {babySleepGuide.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                      <td style={{ padding: '4px', fontWeight: 500 }}>{s.age}</td>
                      <td style={{ padding: '4px' }}>{s.totalSleep}</td>
                      <td style={{ padding: '4px' }}>{s.napCount} × {s.napDuration}</td>
                      <td style={{ padding: '4px' }}>{s.nightSleep}</td>
                      <td style={{ padding: '4px', fontSize: 11 }}>{s.tips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">睡眠训练方法</span></div>
            {sleepTrainingMethods.map((m, i) => (
              <div className="accordion" key={i}>
                <div className="accordion-header" onClick={() => toggle('sleep-method-' + i)}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{m.method}</span>
                    <span className="chip chip-info" style={{ marginLeft: 8, fontSize: 10 }}>{m.suitable}</span>
                  </div>
                  {expanded === 'sleep-method-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'sleep-method-' + i && (
                  <div className="accordion-body">
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>来源：{m.source}</p>
                    <p>{m.description}</p>
                    <p style={{ fontSize: 12, marginTop: 4 }}>要点：{m.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'bag' && (
        <div>
          <Checklist listId="bag-mother" title="妈妈用品" items={hospitalBagList.mother.map(t => ({ text: t }))} />
          <Checklist listId="bag-baby" title="宝宝用品" items={hospitalBagList.baby.map(t => ({ text: t }))} />
          <Checklist listId="bag-other" title="其他" items={hospitalBagList.others.map(t => ({ text: t }))} />
        </div>
      )}

      {tab === 'postpartum' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            产后恢复知识（源自多本育儿书籍整合）
          </div>
          {postpartumRecovery.map((item, i) => (
            <div className="card" key={i}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.topic}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{item.detail}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'easy' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            E.A.S.Y. 常规程序 — 来自特蕾西·霍格《实用程序育儿法》
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">什么是E.A.S.Y.？</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>E</strong>at (吃) → <strong>A</strong>ctivity (活动) → <strong>S</strong>leep (睡) → <strong>Y</strong>our time (你的时间)</p>
              <p style={{ marginTop: 8 }}>这是一个结构化但灵活的日常程序，帮助宝宝建立可预测的生活节奏，同时给父母留出自己的时间。</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">各年龄段参考</span></div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '4px' }}>年龄</th>
                    <th style={{ padding: '4px' }}>E 进食</th>
                    <th style={{ padding: '4px' }}>A 活动</th>
                    <th style={{ padding: '4px' }}>S 睡眠</th>
                    <th style={{ padding: '4px' }}>Y 你的时间</th>
                  </tr>
                </thead>
                <tbody>
                  {easyRoutines.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                      <td style={{ padding: '4px', fontWeight: 500 }}>{r.age}</td>
                      <td style={{ padding: '4px' }}>{r.eat}</td>
                      <td style={{ padding: '4px' }}>{r.activity}</td>
                      <td style={{ padding: '4px' }}>{r.sleep}</td>
                      <td style={{ padding: '4px' }}>{r.yourTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'babycare' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            综合梅奥育儿全书、崔玉涛、实用程序育儿法等权威书籍的宝宝护理指南
          </div>

          {Object.entries(babyCareByMonth).map(([month, topics]) => (
            <div className="card" key={month}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('month-' + month)} style={{ borderBottom: 'none' }}>
                  <span style={{ fontWeight: 600 }}>{month}护理要点</span>
                  {expanded === 'month-' + month ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'month-' + month && (
                  <div className="accordion-body">
                    {topics.map((t, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{t.title}</div>
                        {t.tips.map((tip, j) => (
                          <p key={j} style={{ padding: '2px 0', fontSize: 12 }}>• {tip}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="section-title">详细护理指南</div>
          {babyCareGuide.map((topic, i) => (
            <div className="card" key={i}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('care-' + i)} style={{ borderBottom: 'none' }}>
                  <span style={{ fontWeight: 600 }}>{topic.title}</span>
                  {expanded === 'care-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'care-' + i && (
                  <div className="accordion-body">
                    {topic.content.map((c, j) => (
                      <div key={j} style={{ marginBottom: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2, color: 'var(--primary)' }}>{c.subtitle}</div>
                        <p style={{ fontSize: 12, lineHeight: 1.6 }}>{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'breastmilk' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title">母乳储存</span></div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '4px 8px' }}>条件</th><th style={{ padding: '4px 8px' }}>保存时间</th>
                </tr></thead>
                <tbody>
                  {breastmilkStorage.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '4px 8px', fontWeight: 500 }}>{s.temp}</td>
                      <td style={{ padding: '4px 8px', color: 'var(--primary)', fontWeight: 600 }}>{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">哺乳自查清单</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {breastfeedingChecklist.map((item, i) => <p key={i} style={{ padding: '3px 0' }}>{i + 1}. {item}</p>)}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">胀奶护理</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {engorgementCare.map((tip, i) => <p key={i} style={{ padding: '3px 0' }}>• {tip}</p>)}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">堵奶处理</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {blockedDuctCare.map((tip, i) => <p key={i} style={{ padding: '3px 0' }}>• {tip}</p>)}
            </div>
          </div>

          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <div className="card-header"><span className="card-title" style={{ color: 'var(--danger)' }}>乳腺炎警示</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>症状：</strong>{mastitisSigns.symptoms.join('、')}</p>
              <p style={{ marginTop: 8, fontWeight: 600, color: 'var(--danger)' }}>{mastitisSigns.action}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">新生儿护理常识</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>头部：</strong>{newbornCareBasics.head}</p>
              <p><strong>皮肤：</strong>{newbornCareBasics.skin}</p>
              <p><strong>眼睛：</strong>{newbornCareBasics.eyes}</p>
              <p><strong>头发：</strong>{newbornCareBasics.hair}</p>
              <p style={{ fontWeight: 600, marginTop: 8 }}>出生后检查项目：</p>
              {newbornCareBasics.procedures.map((p, i) => (
                <div key={i} style={{ padding: '4px 0' }}><strong>{p.name}:</strong> {p.purpose}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'health' && (
        <div>
          <HealthPage />
        </div>
      )}
    </div>
  );
}
