
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Key } from 'lucide-react';
import { loadData, saveData } from '../data/store';

// 知识库系统提示 - 基于所有书籍内容
const SYSTEM_PROMPT = `你是育儿助手，融合以下书籍知识回答问题：

1. 《实用程序育儿法》(Tracy Hogg) - E.A.S.Y.常规程序、抱起放下法睡眠训练、4S程序
2. 《梅奥育儿全书》- 0-1岁宝宝全面护理、疫苗接种、逐月发育
3. 《正面管教》(简·尼尔森) - 和善与坚定并行、家庭会议、鼓励而非表扬
4. 《看见孩子》(贝姬·肯尼迪) - 本心善良、连接先于纠正、修复大于完美
5. 《崔玉涛育儿套装》- 新生儿护理、食物过敏、生长发育、常见病症
6. 《蒙台梭利家庭方案+感官训练》- 0-3岁感官训练、蒙氏家庭教育
7. 《真希望我父母读过这本书》- 亲子教养传承、回应孩子感受
8. Pregnancy-Knowledge 知识库 - 孕期营养、饮食份量、症状应对

回答规则：
- 回答简洁有条理，用中文
- 基于上述书籍的真实知识，不编造
- 如果不确定，诚实说明
- 孕期建议注明参考来源
- 对于医疗问题，强调咨询医生`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  text: string;
}

interface Props {
  onClose: () => void;
}

export default function KnowledgeChat({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: '你好！我是育儿知识助手。融合了8本育儿书籍和孕期知识库，你可以问我任何育儿相关问题。' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => loadData<string>('deepseek_key', ''));
  const [showKeyInput, setShowKeyInput] = useState(false);
  const msgEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callLLM = async (userMsg: string) => {
    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: '请先设置 OpenAI API Key。点击右上角钥匙图标，输入你的 API Key（在 https://platform.deepseek.com/api_keys 获取）。' 
      }]);
      return;
    }

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.text })),
      { role: 'user', content: userMsg },
    ];

    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: chatMessages,
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || '请求失败');
      }

      const data = await res.json();
      return data.choices[0].message.content;
    } catch (e: any) {
      return `调用AI出错: ${e.message}。请检查API Key是否正确，网络是否正常。`;
    }
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // 先本地搜索知识库快速响应
    const quickAnswer = searchKnowledge(userMsg);
    if (quickAnswer) {
      setMessages(prev => [...prev, { role: 'assistant', text: quickAnswer }]);
      setLoading(false);
      return;
    }

    // 本地未命中，调用LLM
    const llmAnswer = await callLLM(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', text: llmAnswer }]);
    setLoading(false);
  };

  const saveKey = (key: string) => {
    setApiKey(key);
    saveData('deepseek_key', key);
    setShowKeyInput(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 300, display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={20} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>育儿知识问答</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowKeyInput(!showKeyInput)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: 8, padding: '4px 8px' }}>
            <Key size={18} />
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
      </div>

      {showKeyInput && (
        <div style={{ padding: '12px 16px', background: '#fef3c7', borderBottom: '1px solid #f59e0b' }}>
          <div style={{ fontSize: 12, marginBottom: 6, color: '#92400e' }}>
            OpenAI API Key（保存在本地浏览器）:
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input className="form-input" type="password" placeholder="sk-..." defaultValue={apiKey} id="api-key-input" style={{ fontSize: 12 }} />
            <button className="btn btn-sm btn-primary" onClick={() => {
              const val = (document.getElementById('api-key-input') as HTMLInputElement).value;
              if (val.startsWith('sk-')) saveKey(val);
            }}>保存</button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12, display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.6,
              background: m.role === 'user' ? 'var(--primary)' : 'var(--primary-light)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {m.role === 'assistant' && <Sparkles size={12} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--primary)' }} />}
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'center', padding: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />思考中...
          </div>
        )}
        <div ref={msgEnd} />
      </div>

      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, background: '#fff' }}>
        <input className="form-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder={apiKey ? '输入问题...' : '请先设置API Key（点右上角钥匙图标）'}
          style={{ flex: 1, fontSize: 14 }}
          disabled={loading}
        />
        <button className="btn btn-primary btn-sm" onClick={send} disabled={loading} style={{ minWidth: 44 }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// 本地知识库（快速响应，不消耗API）
const knowledgeDB: { q: string; a: string }[] = [
  { q: '叶酸', a: '孕前3个月至孕早期每日补充叶酸400-600μg。深绿色叶菜（菠菜、西兰花）、豆类、柑橘、全谷物富含叶酸。70%的神经管缺陷由孕早期叶酸缺乏导致。' },
  { q: 'DHA', a: 'DHA（Omega-3）对胎儿大脑和视网膜发育至关重要。孕期每日200-300mg。来源：三文鱼、沙丁鱼、核桃、亚麻籽油、藻油补充剂。孕晚期摄入Omega-3有助宝宝睡眠质量。' },
  { q: '钙', a: '孕期钙需求1000mg/天。来源：牛奶/酸奶（240ml≈300mg钙）、芝士、沙丁鱼、豆腐、芝麻、深色绿叶菜。钙摄入不足时胎儿会从母体骨骼吸收！' },
  { q: '铁', a: '孕期铁需求27mg/天。来源：红肉、动物肝脏（每周≤100g）、贝类、菠菜。搭配VC食物（彩椒、番茄）吸收翻倍。24-28周贫血高发期多加关注。' },
  { q: 'E.A.S.Y.', a: 'E.A.S.Y.是Tracy Hogg提出的宝宝日常程序：Eat(吃)→Activity(活动)→Sleep(睡)→Your time(你的时间)。帮助宝宝建立可预测的生活规律。0-6周每2.5-3小时循环一次。' },
  { q: '睡眠训练', a: '推荐方法：1)抱起-放下法(3月+)——哭时抱起安抚，安静即放下；2)4S程序(0-3月)——设定环境→裹襁褓→坐着→嘘拍；3)渐进消退法(4月+)——逐步延长回应时间。不推荐"哭免法"。' },
];

function searchKnowledge(query: string): string | null {
  const q = query.toLowerCase();
  let best: { a: string; score: number } | null = null;
  for (const item of knowledgeDB) {
    let score = 0;
    for (const kw of item.q.split(/[,，\s]+/)) {
      if (q.includes(kw.toLowerCase())) score += 2;
    }
    if (item.q.includes(q) || q.includes(item.q)) score += 5;
    if (score > 0 && (!best || score > best.score)) best = { a: item.a, score };
  }
  return best && best.score >= 3 ? best.a : null;
}
