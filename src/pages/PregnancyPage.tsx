import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, Apple } from 'lucide-react';
import { pregnancyWeeks, pregnancyNutrients, pregnancyDietGuide, pregnancySymptoms, hospitalBagList } from '../data/knowledge';
import { detailedSymptoms } from '../data/recipes';
import { loadData, saveData } from '../data/store';

export default function PregnancyPage() {
  const [week, setWeek] = useState(() => loadData<number>('preg_week', 8));
  const [expanded, setExpanded] = useState<string | null>(null);

  const currentWeek = pregnancyWeeks.find(w => w.week === week) || pregnancyWeeks[0];

  const handleWeek = (delta: number) => {
    const w = Math.max(4, Math.min(40, week + delta));
    setWeek(w);
    saveData('preg_week', w);
  };

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      {/* Week Picker */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><Heart size={20} color="#ff3b30" /> 孕期周历</span>
          <span className="chip chip-info">孕{week}周</span>
        </div>
        <div className="week-selector">
          <button onClick={() => handleWeek(-1)}><span style={{ fontSize: 20 }}>←</span></button>
          <div className="week-display">{week}周</div>
          <button onClick={() => handleWeek(1)}><span style={{ fontSize: 20 }}>→</span></button>
        </div>
        <div className="stats-row">
          <div className="stat-item"><div className="stat-value" style={{ fontSize: 16 }}>{currentWeek.babySize}</div><div className="stat-label">宝宝大小</div></div>
          <div className="stat-item"><div className="stat-value" style={{ fontSize: 16 }}>{currentWeek.babyWeight}</div><div className="stat-label">宝宝体重</div></div>
          <div className="stat-item"><div className="stat-value" style={{ fontSize: 12 }}>{currentWeek.babyLength}</div><div className="stat-label">宝宝身长</div></div>
          <div className="stat-item"><div className="stat-value" style={{ fontSize: 12 }}>第{currentWeek.trimester === 1 ? '一' : currentWeek.trimester === 2 ? '二' : '三'}孕期</div><div className="stat-label">阶段</div></div>
        </div>
        <div style={{ marginTop: 12, fontSize: 13 }}>
          <p style={{ marginBottom: 6 }}><strong>🧬 宝宝发育：</strong>{currentWeek.development}</p>
          <p style={{ marginBottom: 6 }}><strong>🤰 妈妈变化：</strong>{currentWeek.motherChanges}</p>
          <p style={{ marginBottom: 6 }}><strong>💡 本周建议：</strong>{currentWeek.tips}</p>
          {currentWeek.nutrition && <p style={{ marginBottom: 6 }}><strong>🥗 营养重点：</strong>{currentWeek.nutrition}</p>}
          {currentWeek.checkup && <p style={{ marginBottom: 6 }}><strong>🏥 检查提醒：</strong>{currentWeek.checkup}</p>}
          {currentWeek.warning && <p style={{ marginBottom: 0, color: 'var(--danger)', fontSize: 12 }}><strong>⚠️ 注意：</strong>{currentWeek.warning}</p>}
        </div>
      </div>

      {/* Diet Guide */}
      <div className="section-title">饮食营养</div>
      <div className="card">
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('diet-basics')}>
            <span><Apple size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />基本原则</span>
            {expanded === 'diet-basics' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'diet-basics' && (
            <div className="accordion-body">
              {pregnancyDietGuide.basics.map((d, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <strong>{d.principle}：</strong>{d.detail}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('diet-recommend')}>
            <span>✅ 推荐食物</span>
            {expanded === 'diet-recommend' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'diet-recommend' && (
            <div className="accordion-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {pregnancyDietGuide.recommend.map((f, i) => <span key={i} className="chip chip-success">{f}</span>)}
            </div>
          )}
        </div>
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('diet-avoid')}>
            <span>⚠️ 避免食物</span>
            {expanded === 'diet-avoid' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'diet-avoid' && (
            <div className="accordion-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {pregnancyDietGuide.avoid.map((f, i) => <span key={i} className="chip chip-danger">{f}</span>)}
            </div>
          )}
        </div>
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('nutrients')}>
            <span>💊 关键营养素</span>
            {expanded === 'nutrients' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'nutrients' && (
            <div className="accordion-body" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '4px 8px', textAlign: 'left' }}>名称</th>
                    <th style={{ padding: '4px 8px', textAlign: 'left' }}>RDA</th>
                    <th style={{ padding: '4px 8px', textAlign: 'left' }}>来源</th>
                  </tr>
                </thead>
                <tbody>
                  {pregnancyNutrients.map((n, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '4px 8px', fontWeight: 500 }}>{n.name}</td>
                      <td style={{ padding: '4px 8px' }}>{n.rda}</td>
                      <td style={{ padding: '4px 8px' }}>{n.sources}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Symptoms */}
      <div className="section-title">常见症状应对</div>
      <div className="card">
        {pregnancySymptoms.map((s, i) => (
          <div className="accordion" key={'basic-' + i}>
            <div className="accordion-header" onClick={() => toggle('symptom-basic-' + i)}>
              <span>{s.symptom} <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>({s.timing})</span></span>
              {expanded === 'symptom-basic-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded === 'symptom-basic-' + i && (
              <div className="accordion-body">
                <p><strong>应对方案：</strong>{s.solutions}</p>
                <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>⚠️ {s.danger_sign}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="section-title" style={{ marginTop: 16 }}>更多孕期不适</div>
      <div className="card">
        {detailedSymptoms.map((s, i) => (
          <div className="accordion" key={'detail-' + i}>
            <div className="accordion-header" onClick={() => toggle('symptom-detail-' + i)}>
              <span>{s.name}</span>
              {expanded === 'symptom-detail-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded === 'symptom-detail-' + i && (
              <div className="accordion-body">
                <p style={{ marginBottom: 4 }}>{s.description}</p>
                <p style={{ marginBottom: 4 }}><strong style={{ color: 'var(--success)' }}>应对方案：</strong></p>
                <ul style={{ paddingLeft: 16, fontSize: 12, marginBottom: 4 }}>{s.solutions.map((sol, j) => <li key={j}>{sol}</li>)}</ul>
                <p style={{ color: 'var(--danger)', fontSize: 12 }}>🚨 {s.whenToCallDoctor}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hospital Bag */}
      <div className="section-title">待产准备</div>
      <div className="card">
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('bag-mother')}>
            <span>👩 妈妈用品 ({hospitalBagList.mother.length}项)</span>
            {expanded === 'bag-mother' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'bag-mother' && (
            <div className="accordion-body">
              {hospitalBagList.mother.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
            </div>
          )}
        </div>
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('bag-baby')}>
            <span>👶 宝宝用品 ({hospitalBagList.baby.length}项)</span>
            {expanded === 'bag-baby' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'bag-baby' && (
            <div className="accordion-body">
              {hospitalBagList.baby.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
            </div>
          )}
        </div>
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle('bag-other')}>
            <span>📋 其他 ({hospitalBagList.others.length}项)</span>
            {expanded === 'bag-other' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded === 'bag-other' && (
            <div className="accordion-body">
              {hospitalBagList.others.map((item, i) => <div key={i} style={{ padding: '4px 0' }}>☐ {item}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
