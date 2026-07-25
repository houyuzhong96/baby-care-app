
import { useState, useEffect } from 'react';
import { Check, Plus, Sparkles, Trash2, Edit3 } from 'lucide-react';
import { loadData, saveData, generateId } from '../data/store';
import { getAgeEducation } from '../data/knowledge';

export interface DailyTask {
  id: string;
  text: string;
  done: boolean;
  category: 'suggested' | 'custom';
  createdAt: string;
}

interface Props {
  babyAgeMonths: number;
  apiKey?: string;
}

export default function DailyPlan({ babyAgeMonths, apiKey }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [tasks, setTasks] = useState<DailyTask[]>(() => loadData<DailyTask[]>('daily_tasks_' + today, []));
  const [newTask, setNewTask] = useState('');
  const [customizing, setCustomizing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  // Initialize with suggested tasks based on age
  useEffect(() => {
    if (tasks.length === 0) {
      const edu = getAgeEducation(babyAgeMonths);
      const suggested: DailyTask[] = [];
      
      // Basic daily care tasks
      const basics = [
        '记录今日喂养（母乳/配方奶次数和量）',
        '记录今日睡眠（入睡和醒来时间）',
        '换尿布并记录（保持宝宝干爽）',
        '补充维生素D 400IU',
      ];
      
      // Age-specific tasks
      if (edu) {
        if (edu.activities[0]) basics.push('陪玩: ' + edu.activities[0]);
        if (edu.parentingTips[0]) basics.push(edu.parentingTips[0]);
      }
      
      // Add development check
      if (babyAgeMonths < 6) {
        basics.push('俯卧练习（Tummy Time）至少3次');
        basics.push('给宝宝做抚触按摩10分钟');
      } else if (babyAgeMonths < 12) {
        basics.push('感官游戏时间（探索不同材质/声音）');
        basics.push('读绘本/讲故事10分钟');
      } else {
        basics.push('户外活动/散步30分钟');
        basics.push('自由玩耍（不打断宝宝的专注时刻）');
      }
      
      basics.forEach(text => {
        suggested.push({ id: generateId(), text, done: false, category: 'suggested', createdAt: today });
      });
      
      setTasks(suggested);
    }
  }, [babyAgeMonths]);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    saveData('daily_tasks_' + today, tasks);
  }, [tasks, today]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: generateId(), text: newTask.trim(), done: false, category: 'custom', createdAt: today }]);
    setNewTask('');
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getAiPlan = async () => {
    if (!apiKey) {
      setAiSuggestion('请先在知识对话页面设置 DeepSeek API Key（点击对话窗口右上角钥匙图标）');
      return;
    }
    setAiLoading(true);
    setAiSuggestion('');

    try {
      const edu = getAgeEducation(babyAgeMonths);
      const prompt = `你是育儿助手。宝宝月龄${babyAgeMonths}个月${edu ? '，当前阶段：' + edu.ageLabel : ''}。

请根据以下书籍知识，为这个月龄的宝宝设计一份今日计划（5-7个任务），格式为每行一个任务，用"- "开头：

参考书籍：
- 《实用程序育儿法》E.A.S.Y.程序
- 《正面管教》和善与坚定
- 《蒙台梭利》感官训练
- 《梅奥育儿全书》发育里程碑

任务应该具体可执行，涵盖：喂养、活动/游戏、睡眠、发育刺激、亲子互动。请用中文回答。`;

      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 500, temperature: 0.7 }),
      });

      if (!res.ok) throw new Error('API请求失败');
      const data = await res.json();
      setAiSuggestion(data.choices[0].message.content);
    } catch (e: any) {
      setAiSuggestion(`AI请求失败: ${e.message}`);
    }
    setAiLoading(false);
  };

  const adoptAiSuggestion = (text: string) => {
    // Parse AI suggestion lines and add as tasks
    const lines = text.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('•') || l.trim().match(/^\d+[.、]/));
    const newTasks = lines.map(line => ({
      id: generateId(),
      text: line.replace(/^[-•\d.、\s]+/, '').trim(),
      done: false,
      category: 'custom' as const,
      createdAt: today,
    }));
    if (newTasks.length > 0) {
      setTasks(prev => [...prev, ...newTasks]);
      setAiSuggestion('');
    }
  };

  const doneCount = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📋 今日计划</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="chip chip-success" style={{ fontSize: 11 }}>{doneCount}/{tasks.length}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setCustomizing(!customizing)} style={{ fontSize: 11 }}>
            <Edit3 size={12} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginBottom: 10 }}>
        <div style={{ height: 4, background: progress === 100 ? 'var(--success)' : 'var(--primary)', borderRadius: 2, width: progress + '%', transition: 'width 0.3s' }} />
      </div>

      {/* Tasks */}
      {tasks.map(task => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
          <div
            onClick={() => toggleTask(task.id)}
            style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, cursor: 'pointer',
              border: task.done ? 'none' : '2px solid var(--border)',
              background: task.done ? 'var(--success)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {task.done && <Check size={14} color="#fff" />}
          </div>
          <span style={{
            flex: 1, fontSize: 13, lineHeight: 1.5,
            textDecoration: task.done ? 'line-through' : 'none',
            color: task.done ? 'var(--text-secondary)' : 'var(--text)',
          }}>
            {task.text}
            {task.category === 'custom' && <span style={{ fontSize: 10, color: '#7c3aed', marginLeft: 4 }}>自定义</span>}
          </span>
          {customizing && (
            <button onClick={() => removeTask(task.id)} style={{ border: 'none', background: 'none', color: '#ccc', cursor: 'pointer', padding: 2 }}>
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}

      {/* Add custom task */}
      {customizing && (
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <input className="form-input" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="添加自定义任务..." style={{ flex: 1, fontSize: 13 }} />
          <button className="btn btn-sm btn-primary" onClick={addTask}><Plus size={14} /></button>
        </div>
      )}

      {/* AI plan button */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-sm btn-secondary" onClick={getAiPlan} disabled={aiLoading} style={{ fontSize: 12 }}>
          <Sparkles size={14} style={{ marginRight: 4 }} />
          {aiLoading ? 'AI思考中...' : 'AI规划今日'}
        </button>
      </div>

      {/* AI Suggestion */}
      {aiSuggestion && (
        <div style={{ marginTop: 10, padding: '10px 12px', background: '#f0f5ff', borderRadius: 10, fontSize: 12, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--primary)' }}>🤖 AI建议：</div>
          <div style={{ whiteSpace: 'pre-wrap', marginBottom: 8 }}>{aiSuggestion}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-sm btn-primary" onClick={() => adoptAiSuggestion(aiSuggestion)}>采纳并添加到计划</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setAiSuggestion('')}>忽略</button>
          </div>
        </div>
      )}
    </div>
  );
}
