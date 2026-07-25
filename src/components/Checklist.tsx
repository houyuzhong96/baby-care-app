
import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { loadData, saveData } from '../data/store';

interface Props {
  listId: string;
  title: string;
  icon?: string;
  items: { text: string; checked?: boolean }[];
}

export default function Checklist({ listId, title, icon, items: initialItems }: Props) {
  const [items, setItems] = useState(() => {
    const saved = loadData<{ text: string; checked: boolean }[] | null>('checklist_' + listId, null);
    if (saved) {
      // Merge saved state with current items
      return initialItems.map((item, i) => ({
        text: item.text,
        checked: saved[i]?.checked ?? item.checked ?? false,
      }));
    }
    return initialItems.map(item => ({ text: item.text, checked: item.checked ?? false }));
  });
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    saveData('checklist_' + listId, items);
  }, [items, listId]);

  const toggleItem = (index: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progress = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="card">
      <div className="accordion">
        <div className="accordion-header" onClick={() => setExpanded(!expanded)} style={{ borderBottom: 'none' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon && <span>{icon}</span>}
            <span style={{ fontWeight: 600 }}>{title}</span>
            <span className="chip chip-success">{checkedCount}/{items.length}</span>
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {expanded && (
          <div>
            {/* Progress bar */}
            <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, margin: '8px 0' }}>
              <div style={{ height: 4, background: progress === 100 ? 'var(--success)' : 'var(--primary)', borderRadius: 2, width: progress + '%', transition: 'width 0.3s' }} />
            </div>
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleItem(i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '8px 0',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  opacity: item.checked ? 0.5 : 1,
                }}
              >
                <div style={{
                  width: 22, height: 22,
                  borderRadius: 6,
                  border: item.checked ? 'none' : '2px solid var(--border)',
                  background: item.checked ? 'var(--success)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {item.checked && <Check size={14} color="#fff" />}
                </div>
                <span style={{
                  fontSize: 14,
                  textDecoration: item.checked ? 'line-through' : 'none',
                  color: item.checked ? 'var(--text-secondary)' : 'var(--text)',
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
