
import { useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';

// 知识库索引 - 基于所有书籍内容
const knowledgeDB: { q: string; a: string }[] = [
  { q: '叶酸', a: '孕前3个月至孕早期每日补充叶酸400-600μg。深绿色叶菜（菠菜、西兰花）、豆类、柑橘、全谷物富含叶酸。70%的神经管缺陷由孕早期叶酸缺乏导致。' },
  { q: '孕吐', a: '孕吐通常在6-12周最严重。建议：少食多餐、床边备饼干晨起先吃几口、维生素B6（香蕉/牛油果）、姜茶、避免空腹和油腻。持续呕吐导致脱水超过24小时需就医。' },
  { q: 'DHA', a: 'DHA（Omega-3）对胎儿大脑和视网膜发育至关重要。孕期每日200-300mg。来源：三文鱼、沙丁鱼、核桃、亚麻籽油、藻油补充剂。孕晚期摄入Omega-3有助宝宝睡眠。' },
  { q: '钙', a: '孕期钙需求1000mg/天。来源：牛奶/酸奶（240ml≈300mg钙）、芝士、沙丁鱼、豆腐、芝麻、深色绿叶菜。钙摄入不足时胎儿会从母体骨骼吸收——孕期补钙保护妈妈骨骼！' },
  { q: '铁', a: '孕期铁需求27mg/天（是非孕期的1.5倍）。缺铁性贫血在24-28周高发。来源：红肉、动物肝脏（每周≤100g）、贝类、菠菜、黑木耳。搭配VC食物（彩椒、番茄）吸收翻倍。' },
  { q: 'E.A.S.Y.', a: 'E.A.S.Y.是Tracy Hogg在《实用程序育儿法》中提出的宝宝日常程序：Eat(吃)→Activity(活动)→Sleep(睡)→Your time(你的时间)。这是一个结构化但灵活的节奏，帮助宝宝建立可预测的生活规律，同时给父母留出休息时间。0-6周每2.5-3小时循环一次。' },
  { q: '睡眠训练', a: '推荐方法：1)抱起-放下法(3月+)——哭时抱起安抚，安静即放下，重复；2)4S程序(0-3月)——设定环境→裹襁褓→坐着→嘘拍；3)渐进消退法(4月+)——逐步延长回应时间。不建议"哭免法"(让宝宝哭到睡着)。' },
  { q: '正面管教', a: '简·尼尔森的正面管教核心理念：和善与坚定并行，帮助孩子获得归属感和价值感，长期有效而非短期惩罚，教给孩子有价值的社会和人生技能。推荐工具：家庭会议(3岁+)、启发式提问、选择轮、鼓励而非表扬。' },
  { q: '辅食添加', a: '约6个月开始添加辅食（坐得稳、对食物有兴趣、舌推反射消失）。首选高铁米粉。每3-5天引入一种新食物观察过敏。1岁前不吃蜂蜜（肉毒杆菌风险）和整颗坚果（窒息风险）。不添加糖和盐。' },
  { q: '黄疸', a: '新生儿黄疸在出生2-3天后出现，皮肤眼白发黄。生理性黄疸充分喂养促进排便、间接日光浴即可。病理性黄疸迹象：出生24h内出现、持续超过2周、大便发白、黄疸程度重——需就医光疗。' },
  { q: '疫苗接种', a: '中国一类疫苗（免费）：出生：乙肝①+卡介苗；1月：乙肝②；2月：脊灰①；3月：百白破①+脊灰②；4月：百白破②+脊灰③；5月：百白破③；6月：乙肝③+A群流脑①；8月：麻腮风①+乙脑①；18月：百白破④+麻腮风②+甲肝；2岁：乙脑②；4岁：脊灰④；6岁：白破。' },
  { q: '蒙台梭利', a: '蒙台梭利0-3岁核心理念：跟随孩子的发展节奏，提供准备好的环境，让孩子通过感官探索自主学习。关键实践：0-3月黑白卡追视+抚触按摩，3-6月感官篮探索不同材质，6-12月投放游戏+简单拼图，12-18月倒水练习+感官步道。' },
  { q: '产后恢复', a: '子宫6周内恢复至孕前大小；恶露持续4-6周由红转白；会阴侧切缝线约2周吸收；凯格尔运动恢复盆底肌（咨询医生何时开始）；乳房用清水清洗即可；产后情绪低落(Baby Blues)持续超2周需警惕产后抑郁。' },
  { q: '胎动', a: '初产妇约16-20周首次感觉胎动（像蝴蝶振翅），经产妇更早。从28周开始每天固定时间数胎动：选择宝宝活跃的2小时应有10次以上。胎动明显减少（<10次/2小时）需立即就医。28周前胎动规律性不强，不需要严格计数。' },
  { q: '体重管理', a: '孕期体重增长目标（基于孕前BMI）：偏瘦(BMI<18.5)增12.5-18kg，正常(BMI18.5-24.9)增11.5-16kg，超重(BMI25-29.9)增7-11.5kg，肥胖(BMI≥30)增5-9kg。孕早期几乎不需要额外增重，中晚期每周约0.4-0.5kg。' },
  { q: '妊糖', a: '妊娠期糖尿病通常在24-28周通过OGTT筛查。管理：选择低GI食物（全麦、糙米、豆类替代精制碳水）、少量多餐、餐后散步20分钟、自我监测血糖。控制好血糖可预防巨大儿和新生儿低血糖。' },
  { q: '凯格尔运动', a: '凯格尔运动（盆底肌训练）从孕期即可开始。方法：像憋尿一样收缩盆底肌保持5-10秒放松，重复10次为一组每天3-4组。产后继续做有助于恢复盆底肌力量预防漏尿。建议咨询医生确定开始时间。' },
  { q: '防妊娠纹', a: '妊娠纹与遗传关系最大难以完全预防。建议：控制体重增长速度（不要急剧增重）、涂抹保湿霜/妊娠纹霜保持皮肤滋润、多喝水保持皮肤水分。绝大多数孕妈都会有，产后会变淡。' },
  { q: '待产包', a: '妈妈需带：身份证+医保卡+产检档案、哺乳内衣、防溢乳垫、产后卫生巾、一次性内裤、拖鞋、吸管杯、出院衣物。宝宝需带：纯棉连体衣2-3套、包被、新生儿纸尿裤NB码、湿巾、婴儿帽、安全提篮。' },
  { q: '母乳储存', a: '母乳储存时间：室温<25度可存4小时，冷藏(4度)3天（放冰箱内部非门架），冷冻(-18度)3-6个月。解冻后放冷藏24小时内使用。已加热未吃完1-2小时内丢弃。不要用微波炉加热母乳——用温水或温奶器。' },
  { q: '新生儿喂养频率', a: '新生儿（0-6周）每2-3小时喂一次，每天8-12次。母乳每次15-30分钟/侧。配方奶每公斤体重约150ml/天分6-8次。饥饿信号：咂嘴、伸舌头、转头（觅食反射）、吮吸手指。哭是最后的饥饿信号——不要等哭了再喂。' },
  { q: '分离焦虑', a: '分离焦虑在6-9个月开始出现，9-18个月达到高峰，是正常发育阶段。应对：每次离开时告知宝宝并道别（不要偷偷溜走）、短暂分离练习（去另一个房间马上回来）、保持规律作息增加可预测性。玩躲猫猫有助于理解"物体恒存"。' },
];

function searchKnowledge(query: string): string {
  const q = query.toLowerCase();
  let best: { a: string; score: number } | null = null;
  
  for (const item of knowledgeDB) {
    let score = 0;
    const keywords = item.q.split(/[,，\s]+/);
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase())) score += 2;
    }
    // Partial match on question
    if (item.q.includes(q) || q.includes(item.q)) score += 5;
    
    if (score > 0 && (!best || score > best.score)) {
      best = { a: item.a, score };
    }
  }
  
  if (best && best.score >= 2) return best.a;
  return '抱歉，我在知识库中没有找到完全匹配的内容。你可以尝试问我关于：叶酸、孕吐、DHA、钙、铁、E.A.S.Y.、睡眠训练、正面管教、辅食添加、黄疸、疫苗接种、蒙台梭利、产后恢复、胎动、体重管理、妊糖、凯格尔运动、防妊娠纹、待产包、母乳储存、新生儿喂养、分离焦虑等问题。';
}

interface Props {
  onClose: () => void;
}

export default function KnowledgeChat({ onClose }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: '你好！我是育儿知识助手，融合了8本育儿书籍和孕期知识库。你可以问我任何育儿相关的问题。' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    setTimeout(() => {
      const answer = searchKnowledge(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    }, 400);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 300, display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={20} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>育儿知识问答</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 12,
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: 14,
              fontSize: 14,
              lineHeight: 1.6,
              background: m.role === 'user' ? 'var(--primary)' : 'var(--primary-light)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
            }}>
              {m.role === 'assistant' && <Sparkles size={12} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--primary)' }} />}
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <input
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="输入问题，如：叶酸怎么补充？"
          style={{ flex: 1, fontSize: 14 }}
        />
        <button className="btn btn-primary btn-sm" onClick={send} style={{ minWidth: 44 }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
