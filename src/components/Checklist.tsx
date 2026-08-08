
import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
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
    const defaults = initialItems.map(item => ({ text: item.text, checked: item.checked ?? false }));
    if (!saved || saved.length === 0) return defaults;
    // 保留用户增删后的内容，同时把后加入的默认项目补充回来
    const savedTexts = new Set(saved.map(s => s.text));
    const newDefaults = defaults.filter(d => !savedTexts.has(d.text));
    return [...saved, ...newDefaults];
  });
  const [expanded, setExpanded] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    saveData('checklist_' + listId, items);
  }, [items, listId]);

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setItems(prev => [...prev, { text: newItemText.trim(), checked: false }]);
    setNewItemText('');
  };

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
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={(e) => { e.stopPropagation(); setEditing(!editing); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: editing ? 'var(--accent)' : 'var(--text-muted)', fontSize: 12, padding: '2px 6px', borderRadius: 4 }}>
              {editing ? '完成' : '编辑'}
            </button>
            {expanded ? <ChevronUp size={16} style={{ cursor: 'pointer' }} /> : <ChevronDown size={16} style={{ cursor: 'pointer' }} />}
          </div>
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
                {editing && (
                  <button onClick={(e) => { e.stopPropagation(); removeItem(i); }} style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          {editing && (
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <input className="form-input" value={newItemText} onChange={e => setNewItemText(e.target.value)} onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') addItem(); }} placeholder="添加新项目..." style={{ flex: 1, fontSize: 12 }} />
                <button className="btn btn-sm btn-primary" onClick={addItem}><Plus size={14} /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
