import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp, UtensilsCrossed, Home } from 'lucide-react';
import {
  pregnancyNutrients, pregnancyDietGuide, hospitalBagList, postpartumRecovery,
  feedingGuide, babySleepGuide, sleepTrainingMethods, easyRoutines,
} from '../data/knowledge';
import { dailyServings, weeklyMealPlan, trimesterMealTips, breastmilkStorage, newbornCareBasics, breastfeedingChecklist, engorgementCare, blockedDuctCare, mastitisSigns } from '../data/recipes';

export default function KnowledgePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'diet';
  const [tab, setTab] = useState(initialTab);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      <div className="tabs" style={{ flexWrap: 'wrap' }}>
        <button className={'tab' + (tab === 'diet' ? ' active' : '')} onClick={() => setTab('diet')}>孕期饮食</button>
        <button className={'tab' + (tab === 'recipes' ? ' active' : '')} onClick={() => setTab('recipes')}><UtensilsCrossed size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />孕期食谱</button>
        <button className={'tab' + (tab === 'feeding' ? ' active' : '')} onClick={() => setTab('feeding')}>宝宝喂养</button>
        <button className={'tab' + (tab === 'sleep' ? ' active' : '')} onClick={() => setTab('sleep')}>宝宝睡眠</button>
        <button className={'tab' + (tab === 'bag' ? ' active' : '')} onClick={() => setTab('bag')}>待产清单</button>
        <button className={'tab' + (tab === 'postpartum' ? ' active' : '')} onClick={() => setTab('postpartum')}>产后恢复</button>
        <button className={'tab' + (tab === 'easy' ? ' active' : '')} onClick={() => setTab('easy')}>E.A.S.Y.</button>
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
        <div className="card">
          <div className="card-header"><span className="card-title"><Home size={18} /> 待产包清单</span></div>
          <div className="accordion">
            <div className="accordion-header" onClick={() => toggle('bag-m')}>
              <span>👩 妈妈用品 ({hospitalBagList.mother.length}项)</span>
              {expanded === 'bag-m' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded === 'bag-m' && (
              <div className="accordion-body">
                {hospitalBagList.mother.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
              </div>
            )}
          </div>
          <div className="accordion">
            <div className="accordion-header" onClick={() => toggle('bag-b')}>
              <span>👶 宝宝用品 ({hospitalBagList.baby.length}项)</span>
              {expanded === 'bag-b' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded === 'bag-b' && (
              <div className="accordion-body">
                {hospitalBagList.baby.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
              </div>
            )}
          </div>
          <div className="accordion">
            <div className="accordion-header" onClick={() => toggle('bag-o')}>
              <span>📋 其他 ({hospitalBagList.others.length}项)</span>
              {expanded === 'bag-o' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded === 'bag-o' && (
              <div className="accordion-body">
                {hospitalBagList.others.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
              </div>
            )}
          </div>
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
