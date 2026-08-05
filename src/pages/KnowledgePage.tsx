import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp, UtensilsCrossed, MessageCircle, ChefHat } from 'lucide-react';
import {
  pregnancyNutrients, pregnancyDietGuide, hospitalBagList, postpartumRecovery,
  feedingGuide, babySleepGuide, sleepTrainingMethods, easyRoutines, babyCareGuide, babyCareByMonth,
} from '../data/knowledge';
import { dailyServings, weeklyMealPlan, trimesterMealTips, breastmilkStorage, newbornCareBasics, breastfeedingChecklist, engorgementCare, blockedDuctCare, mastitisSigns, chineseRecipes, chineseWeeklyMealPlan } from '../data/recipes';
import Checklist from '../components/Checklist';
import KnowledgeChat from '../components/KnowledgeChat';

export default function KnowledgePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'diet';
  const [tab, setTab] = useState(initialTab);
  useEffect(() => setTab(searchParams.get('tab') || ((localStorage.getItem('app_mode')||'pregnancy')==='pregnancy'?'diet':'babycare')), [searchParams]);
  useEffect(() => { const handler = () => { const m = localStorage.getItem('app_mode') || 'pregnancy'; /* mode listener */ setTab(m === 'pregnancy' ? 'diet' : 'babycare'); }; window.addEventListener('modeChange', handler); return () => window.removeEventListener('modeChange', handler); }, []);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

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
        <button className={'tab' + (tab === 'diet' ? ' active' : '')} onClick={() => setTab('diet')}>孕期饮食</button>
        <button className={'tab' + (tab === 'recipes' ? ' active' : '')} onClick={() => setTab('recipes')}><UtensilsCrossed size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />孕期食谱</button>
        <button className={'tab' + (tab === 'chinese' ? ' active' : '')} onClick={() => setTab('chinese')}><ChefHat size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />中式食谱</button>
        <button className={'tab' + (tab === 'feeding' ? ' active' : '')} onClick={() => setTab('feeding')}>宝宝喂养</button>
        <button className={'tab' + (tab === 'sleep' ? ' active' : '')} onClick={() => setTab('sleep')}>宝宝睡眠</button>
        <button className={'tab' + (tab === 'bag' ? ' active' : '')} onClick={() => setTab('bag')}>待产清单</button>
        <button className={'tab' + (tab === 'postpartum' ? ' active' : '')} onClick={() => setTab('postpartum')}>产后恢复</button>
        <button className={'tab' + (tab === 'easy' ? ' active' : '')} onClick={() => setTab('easy')}>E.A.S.Y.</button>
          <button className={'tab' + (tab === 'health' ? ' active' : '')} onClick={() => setTab('health')}>健康</button>
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

      
      {tab === 'recipes' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title"><UtensilsCrossed size={18} /> 每日份量指南</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
              <p>孕期每日可额外摄入300大卡优质热量，建议少吃多餐</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '4px 6px' }}>类别</th><th style={{ padding: '4px 6px' }}>份数</th><th style={{ padding: '4px 6px' }}>举例</th>
                </tr></thead>
                <tbody>
                  {dailyServings.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                      <td style={{ padding: '4px 6px', fontWeight: 500 }}>{s.category}</td>
                      <td style={{ padding: '4px 6px', color: 'var(--primary)', fontWeight: 600 }}>{s.servings}</td>
                      <td style={{ padding: '4px 6px', fontSize: 11 }}>{s.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {Object.entries(trimesterMealTips).map(([key, t]) => (
            <div className="card" key={key}>
              <div className="card-header">
                <span className="card-title">{t.title}</span>
                <span className="chip chip-info">重点: {t.focus}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                {t.tips.map((tip, i) => <p key={i} style={{ padding: '3px 0' }}>\u2022 {tip}</p>)}
              </div>
            </div>
          ))}

          <div className="card">
            <div className="card-header"><span className="card-title">一周食谱参考</span></div>
            <div style={{ fontSize: 13 }}>
              {Object.entries(weeklyMealPlan).map(([day, meals]) => (
                <div key={day} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{day}</div>
                  {meals.map((m, i) => <div key={i} style={{ padding: '2px 0', color: 'var(--text-secondary)' }}>{m}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'feeding' && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title">🤱 母乳喂养</span></div>
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
            <div className="card-header"><span className="card-title">🍼 配方喂养</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>冲泡：</strong>{feedingGuide.formula.preparation}</p>
              <p><strong>用量：</strong>{feedingGuide.formula.amount}</p>
              <p><strong>安全：</strong>{feedingGuide.formula.safety}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">🥄 辅食添加</span></div>
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
            <div className="card-header"><span className="card-title">🌙 各阶段睡眠指南</span></div>
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
            <div className="card-header"><span className="card-title">💤 睡眠训练方法</span></div>
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
                    <p style={{ fontSize: 12, marginTop: 4 }}>📝 {m.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'bag' && (
        <div>
          <Checklist listId="bag-mother" title="👩 妈妈用品" icon="" items={hospitalBagList.mother.map(t => ({ text: t }))} />
          <Checklist listId="bag-baby" title="👶 宝宝用品" icon="" items={hospitalBagList.baby.map(t => ({ text: t }))} />
          <Checklist listId="bag-other" title="📋 其他" icon="" items={hospitalBagList.others.map(t => ({ text: t }))} />
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
            <div className="card-header"><span className="card-title">📋 什么是E.A.S.Y.？</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>E</strong>at (吃) → <strong>A</strong>ctivity (活动) → <strong>S</strong>leep (睡) → <strong>Y</strong>our time (你的时间)</p>
              <p style={{ marginTop: 8 }}>这是一个结构化但灵活的日常程序，帮助宝宝建立可预测的生活节奏，同时给父母留出自己的时间。</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">📊 各年龄段参考</span></div>
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
      
      {tab === 'chinese' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            中式孕期食谱——海鲜、牛肉、猪肉、鸡肉、时令蔬菜，按三孕期分类
          </div>
          {/* Weekly plan */}
          <div className="card">
            <div className="card-header"><span className="card-title"><ChefHat size={18} /> 七日食谱推荐</span></div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {Object.keys(chineseWeeklyMealPlan).map(key => (
                <button key={key} className={'btn btn-sm ' + (expanded === 'week-' + key ? 'btn-primary' : 'btn-secondary')} onClick={() => toggle('week-' + key)}>
                  {key}
                </button>
              ))}
            </div>
            {(expanded && expanded.startsWith('week-') && chineseWeeklyMealPlan[expanded.replace('week-', '') as keyof typeof chineseWeeklyMealPlan]) && (
              <div>
                {chineseWeeklyMealPlan[expanded.replace('week-', '') as keyof typeof chineseWeeklyMealPlan]?.map((day, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>第{i + 1}天</div>
                    <div style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                      <p>🌅 早餐：{day.breakfast}</p>
                      <p>☀️ 午餐：{day.lunch}</p>
                      <p>🌙 晚餐：{day.dinner}</p>
                      <p>🍪 加餐：{day.snack}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recipe cards */}
          {(['海鲜', '牛肉', '猪肉', '鸡肉', '蔬菜', '汤羹'] as const).map(cat => {
            const recipes = chineseRecipes.filter(r => r.category === cat);
            if (recipes.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: 8 }}>
                <div className="section-title">{cat}</div>
                {recipes.map((r, i) => (
                  <div className="card" key={i}>
                    <div className="accordion">
                      <div className="accordion-header" onClick={() => toggle('recipe-' + r.name)} style={{ borderBottom: 'none' }}>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                            <span className="chip chip-info" style={{ fontSize: 10 }}>{r.mealType}</span>
                            {r.trimester.map(t => <span key={t} className="chip" style={{ fontSize: 10, background: '#ede9fe', color: '#7c3aed' }}>{t === 'first' ? '孕早期' : t === 'second' ? '孕中期' : '孕晚期'}</span>)}
                          </div>
                        </div>
                        {expanded === 'recipe-' + r.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      {expanded === 'recipe-' + r.name && (
                        <div className="accordion-body">
                          <p><strong>食材：</strong>{r.ingredients}</p>
                          <p style={{ marginTop: 4 }}><strong>做法：</strong>{r.method}</p>
                          <p style={{ marginTop: 4, color: 'var(--success)' }}><strong>营养：</strong>{r.nutrition}</p>
                          <p style={{ marginTop: 4, fontSize: 12, color: 'var(--text-secondary)' }}>💡 {r.tips}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      
      {tab === 'babycare' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            综合梅奥育儿全书、崔玉涛、实用程序育儿法等权威书籍的宝宝护理指南
          </div>
          
          {/* Monthly care tips */}
          {Object.entries(babyCareByMonth).map(([month, topics]) => (
            <div className="card" key={month}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('month-' + month)} style={{ borderBottom: 'none' }}>
                  <span style={{ fontWeight: 600 }}>🗓️ {month}护理要点</span>
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

          {/* Detailed care topics */}
          <div className="section-title">详细护理指南</div>
          {babyCareGuide.map((topic, i) => (
            <div className="card" key={i}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('care-' + i)} style={{ borderBottom: 'none' }}>
                  <span><span style={{ marginRight: 6 }}>{topic.icon}</span><span style={{ fontWeight: 600 }}>{topic.title}</span></span>
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
            <div className="card-header"><span className="card-title">🤱 母乳储存</span></div>
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
            <div className="card-header"><span className="card-title">📋 哺乳自查清单</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {breastfeedingChecklist.map((item, i) => <p key={i} style={{ padding: '3px 0' }}>{i + 1}. {item}</p>)}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">⚠️ 胀奶护理</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {engorgementCare.map((tip, i) => <p key={i} style={{ padding: '3px 0' }}>\u2022 {tip}</p>)}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">🚨 堵奶处理</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {blockedDuctCare.map((tip, i) => <p key={i} style={{ padding: '3px 0' }}>\u2022 {tip}</p>)}
            </div>
          </div>

          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <div className="card-header"><span className="card-title" style={{ color: 'var(--danger)' }}>🆘 乳腺炎警示</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>症状：</strong>{mastitisSigns.symptoms.join('、')}</p>
              <p style={{ marginTop: 8, fontWeight: 600, color: 'var(--danger)' }}>{mastitisSigns.action}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">👶 新生儿护理常识</span></div>
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


    </div>
  );
}
