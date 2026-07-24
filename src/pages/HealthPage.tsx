import { useState } from 'react';
import { Stethoscope, AlertCircle, ChevronDown, ChevronUp, Syringe } from 'lucide-react';
import { commonIllnesses, vaccines } from '../data/knowledge';

export default function HealthPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<'illness' | 'vaccine'>('illness');
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      <div className="tabs">
        <button className={'tab' + (tab === 'illness' ? ' active' : '')} onClick={() => setTab('illness')}>
          <Stethoscope size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />常见病症
        </button>
        <button className={'tab' + (tab === 'vaccine' ? ' active' : '')} onClick={() => setTab('vaccine')}>
          <Syringe size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />疫苗接种
        </button>
      </div>

      {tab === 'illness' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            以下信息仅供快速参考，不能替代医生诊断。如有疑虑请及时就医。
          </div>
          {commonIllnesses.map((illness, i) => (
            <div className="card" key={i}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle('illness-' + i)} style={{ borderBottom: 'none' }}>
                  <span style={{ fontWeight: 600 }}>{illness.name}</span>
                  {expanded === 'illness-' + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === 'illness-' + i && (
                  <div className="accordion-body">
                    <p style={{ marginBottom: 8 }}><strong>症状：</strong>{illness.symptoms}</p>
                    <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--success)' }}>家庭护理：</strong>{illness.care}</p>
                    <p style={{ color: 'var(--danger)' }}><strong>🚨 需就医：</strong>{illness.seeDoctor}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'vaccine' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            中国国家免疫规划疫苗（一类疫苗，免费）。具体接种时间请遵医嘱。
          </div>
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '6px 8px' }}>月龄</th>
                  <th style={{ padding: '6px 8px' }}>疫苗</th>
                  <th style={{ padding: '6px 8px' }}>备注</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 500 }}>{v.age}</td>
                    <td style={{ padding: '6px 8px' }}>{v.name}</td>
                    <td style={{ padding: '6px 8px', fontSize: 11, color: 'var(--text-secondary)' }}>{v.note || v.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
