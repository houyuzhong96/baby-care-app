import { useState } from 'react';
import { Brain, PlayCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { milestones, sensoryGames, positiveDiscipline, goodInside } from '../data/knowledge';

export default function DevelopmentPage() {
  const [tab, setTab] = useState<'milestone' | 'sensory' | 'discipline'>('milestone');
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      <div className="tabs">
        <button className={'tab' + (tab === 'milestone' ? ' active' : '')} onClick={() => setTab('milestone')}>
          <Brain size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />发育里程碑
        </button>
        <button className={'tab' + (tab === 'sensory' ? ' active' : '')} onClick={() => setTab('sensory')}>
          <PlayCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />感官训练
        </button>
        <button className={'tab' + (tab === 'discipline' ? ' active' : '')} onClick={() => setTab('discipline')}>
          <BookOpen size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />正面管教
        </button>
      </div>

      {tab === 'milestone' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '4px 6px' }}>月龄</th>
                <th style={{ padding: '4px 6px' }}>大运动</th>
                <th style={{ padding: '4px 6px' }}>精细动作</th>
                <th style={{ padding: '4px 6px' }}>语言</th>
                <th style={{ padding: '4px 6px' }}>社交</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                  <td style={{ padding: '4px 6px', fontWeight: 600 }}>{m.age}</td>
                  <td style={{ padding: '4px 6px' }}>{m.grossMotor}</td>
                  <td style={{ padding: '4px 6px' }}>{m.fineMotor}</td>
                  <td style={{ padding: '4px 6px' }}>{m.language}</td>
                  <td style={{ padding: '4px 6px' }}>{m.social}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'sensory' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            蒙台梭利0-3岁感官系统训练方案
          </div>
          {sensoryGames.map((g, i) => (
            <div className="card" key={i}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('sense-' + i)} style={{ borderBottom: 'none' }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{g.activity}</span>
                    <span className="chip chip-info" style={{ marginLeft: 8, fontSize: 10 }}>{g.age}</span>
                    <span className="chip" style={{ marginLeft: 4, fontSize: 10, background: '#ede9fe', color: '#7c3aed' }}>{g.category}</span>
                  </div>
                  {expanded === 'sense-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'sense-' + i && (
                  <div className="accordion-body">
                    <p><strong>材料：</strong>{g.materials}</p>
                    <p><strong>目标：</strong>{g.goal}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'discipline' && (
        <div>
          {/* Positive Discipline */}
          <div className="card">
            <div className="card-header"><span className="card-title">📘 正面管教（简·尼尔森）</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>核心理念：</p>
              {positiveDiscipline.principles.map((p, i) => (
                <p key={i} style={{ padding: '3px 0' }}>{i + 1}. {p}</p>
              ))}
              <p style={{ fontWeight: 600, marginTop: 12, marginBottom: 6 }}>实用工具：</p>
              {positiveDiscipline.tools.map((t, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <strong>{t.tool}</strong> <span className="chip chip-info" style={{ fontSize: 10 }}>{t.age}</span>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Good Inside */}
          <div className="card">
            <div className="card-header"><span className="card-title">📗 看见孩子（贝姬·肯尼迪）</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>核心信念：</p>
              <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: 8 }}>{goodInside.core_truth}</p>
              {goodInside.insights.map((insight, i) => (
                <p key={i} style={{ padding: '3px 0' }}>• {insight}</p>
              ))}
              <p style={{ fontWeight: 600, marginTop: 12, marginBottom: 4 }}>实用策略：</p>
              {goodInside.strategies.map((s, i) => (
                <p key={i} style={{ padding: '4px 0', fontSize: 12 }}>{s}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
