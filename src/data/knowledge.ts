// ======== 孕期知识 ========

export interface Nutrient {
  name: string;
  type: 'vitamin' | 'mineral';
  function_embryo: string;
  function_mother: string;
  rda: string;
  sources: string;
  risk: string;
}

export const pregnancyNutrients: Nutrient[] = [
  { name: '叶酸', type: 'vitamin', function_embryo: '神经管发育、红细胞生成', function_mother: '红细胞生成', rda: '600μg/天', sources: '绿叶菜、芦笋、鳄梨、香蕉、橘子、番茄、豆类', risk: '70%神经管缺陷由孕早期缺乏叶酸导致' },
  { name: '铁', type: 'mineral', function_embryo: '造血、大脑发育', function_mother: '预防贫血、增加血容量', rda: '27mg/天', sources: '红肉、动物肝脏、菠菜、豆类、黑木耳', risk: '贫血、早产、低出生体重' },
  { name: '钙', type: 'mineral', function_embryo: '骨骼牙齿发育、神经发育', function_mother: '预防骨质疏松', rda: '1000mg/天', sources: '牛奶、酸奶、芝士、沙丁鱼、豆腐、芝麻、深色绿叶菜', risk: '母体骨质疏松' },
  { name: 'DHA (Omega-3)', type: 'mineral', function_embryo: '大脑和视网膜发育', function_mother: '改善情绪、预防早产', rda: '200-300mg/天', sources: '深海鱼、核桃、亚麻籽油', risk: '婴儿睡眠不佳' },
  { name: '碘', type: 'mineral', function_embryo: '甲状腺激素合成、大脑发育', function_mother: '维持甲状腺功能', rda: '220μg/天', sources: '碘盐、海带紫菜、海鱼', risk: '克汀病、智力低下' },
  { name: '锌', type: 'mineral', function_embryo: '细胞分裂、DNA合成', function_mother: '免疫支持、组织修复', rda: '11mg/天', sources: '牡蛎、红肉、豆类、坚果', risk: '生长迟缓、免疫力低下' },
  { name: '维生素D', type: 'vitamin', function_embryo: '钙磷代谢', function_mother: '钙吸收、骨骼健康', rda: '600IU/天', sources: '日晒、三文鱼、蛋黄', risk: '新生儿癫痫' },
  { name: '维生素C', type: 'vitamin', function_embryo: '胶原蛋白生成', function_mother: '铁吸收、增强抵抗力', rda: '85mg/天', sources: '柑橘、西兰花、草莓、猕猴桃', risk: '' },
];

export interface PregnancyWeek {
  week: number;
  trimester: 1 | 2 | 3;
  babySize: string;
  babyWeight: string;
  development: string;
  motherChanges: string;
  tips: string;
}

export const pregnancyWeeks: PregnancyWeek[] = [
  { week: 4, trimester: 1, babySize: '罂粟籽', babyWeight: '<1g', development: '胚胎着床，神经管开始形成', motherChanges: '停经，可能早孕反应', tips: '开始服用叶酸(400-600μg/天)，避免酒精和烟草' },
  { week: 8, trimester: 1, babySize: '覆盆子', babyWeight: '约1g', development: '心脏跳动，四肢萌芽', motherChanges: '晨吐、疲劳、乳房胀痛', tips: '少量多餐，补充叶酸，预约第一次产检' },
  { week: 12, trimester: 1, babySize: '李子', babyWeight: '约14g', development: '手指脚趾分离，器官形成', motherChanges: '晨吐缓解，子宫上升至腹腔', tips: 'NT检查(11-13周)，建立孕期档案' },
  { week: 16, trimester: 2, babySize: '牛油果', babyWeight: '约100g', development: '胎动可能开始，骨骼硬化', motherChanges: '腹部显怀，精力恢复', tips: '唐筛，注意铁和钙摄入' },
  { week: 20, trimester: 2, babySize: '香蕉', babyWeight: '约300g', development: '能听到声音，头发指甲生长', motherChanges: '明显胎动，可能腰酸', tips: '大排畸B超(20-24周)，凯格尔运动' },
  { week: 24, trimester: 2, babySize: '玉米', babyWeight: '约600g', development: '肺部发育，有睡眠周期', motherChanges: '可能水肿，妊娠纹', tips: '糖耐量检查(24-28周)，控制糖分' },
  { week: 28, trimester: 3, babySize: '茄子', babyWeight: '约1kg', development: '能睁眼闭眼，大脑快速发育', motherChanges: '呼吸急促，睡眠不佳', tips: '数胎动(每天10次/2h)，准备待产包' },
  { week: 32, trimester: 3, babySize: '南瓜', babyWeight: '约1.7kg', development: '皮下脂肪增厚', motherChanges: '频繁排尿，假性宫缩', tips: '确定分娩方式，注意胎位' },
  { week: 36, trimester: 3, babySize: '生菜', babyWeight: '约2.6kg', development: '肺部成熟，脂肪充足', motherChanges: '腹部下降（入盆）', tips: '每周产检，准备随时入院' },
  { week: 40, trimester: 3, babySize: '小南瓜', babyWeight: '约3.4kg', development: '完全发育，等待分娩', motherChanges: '可能见红、规律宫缩', tips: '超过41周需引产，注意胎动' },
];

export const pregnancySymptoms = [
  { symptom: '晨吐/恶心', timing: '孕6-12周', solutions: '少量多餐，避免空腹，吃干面包/饼干，维生素B6，姜茶', danger_sign: '严重呕吐导致脱水>24小时需就医' },
  { symptom: '腰酸背疼', timing: '孕中期后', solutions: '正确姿势、孕妇枕、热敷、适度运动', danger_sign: '持续剧烈疼痛伴发热' },
  { symptom: '水肿', timing: '孕晚期', solutions: '抬高腿部、左侧卧、适量饮水、限盐', danger_sign: '突然严重水肿伴高血压' },
  { symptom: '烧心/胃灼热', timing: '孕中晚期', solutions: '少量多餐、饭后不躺、避免辛辣油腻', danger_sign: '影响进食伴严重疼痛' },
  { symptom: '便秘', timing: '全程', solutions: '多喝水、高纤维食物、适度运动、益生菌', danger_sign: '持续一周以上伴腹痛' },
  { symptom: '腿部抽筋', timing: '孕中晚期', solutions: '补钙镁、睡前拉伸、避免久站', danger_sign: '频繁抽筋影响睡眠' },
  { symptom: '失眠', timing: '孕晚期', solutions: '左侧卧、孕妇枕、睡前放松、规律作息', danger_sign: '长期失眠影响日间功能' },
];


export const pregnancyDietGuide = {
  basics: [
    { principle: '均衡多样', detail: '谷薯类+蔬菜水果+肉禽蛋奶+豆类坚果' },
    { principle: '少食多餐', detail: '一天5-6餐，每餐7分饱' },
    { principle: '禁烟禁酒', detail: '烟草和酒精有明确的致畸风险' },
    { principle: '限咖啡因', detail: '每日咖啡因不超过200mg（约1杯咖啡）' },
    { principle: '避免生食', detail: '不吃生肉、生鱼片、未全熟蛋、未经巴氏消毒乳制品' },
    { principle: '控制体重', detail: 'BMI正常者增重11.5-16kg，超重者7-11.5kg' },
  ],
  avoid: ['高汞鱼类（鲨鱼、剑鱼）', '生食/未煮熟肉类', '未经消毒的奶制品', '含酒精食物', '过量肝脏（维生素A过量）', '某些中草药'],
  recommend: ['深色绿叶菜', '鸡蛋', '三文鱼/沙丁鱼', '牛奶/酸奶', '红肉', '豆类', '坚果', '全谷物'],
};

export const hospitalBagList = {
  mother: ['身份证、医保卡、产检档案', '哺乳内衣2-3件', '防溢乳垫', '产后卫生巾/安心裤', '一次性内裤', '洗漱用品', '拖鞋', '充电器', '吸管杯', '出院衣物', '乳头霜（羊脂膏）'],
  baby: ['纯棉连体衣2-3套', '包被/襁褓', '新生儿纸尿裤NB码', '湿巾、棉柔巾', '小毛巾', '婴儿帽', '配方奶+奶瓶（备用）', '安全提篮（出院用）'],
  others: ['手机/相机', '能量零食', '现金'],
};


// ======== E.A.S.Y. 常规程序 (实用程序育儿法 - Tracy Hogg) ========

export interface EasyRoutine {
  age: string;
  eat: string;
  activity: string;
  sleep: string;
  yourTime: string;
}

export const easyRoutines: EasyRoutine[] = [
  { age: '0-6周', eat: '每2.5-3小时母乳/配方', activity: '换尿布、短暂互动(5-15分钟)', sleep: '每次1.5-2小时', yourTime: '宝宝睡觉时休息' },
  { age: '6周-4月', eat: '每3-4小时', activity: '互动游戏、趴玩(15-30分钟)', sleep: '每次1.5-2小时，白天3-4小睡', yourTime: '有更多自己的时间块' },
  { age: '4-6月', eat: '每4小时+尝试辅食', activity: '探索环境、感官游戏(30-45分钟)', sleep: '上午下午各一觉+傍晚短觉', yourTime: '规律的生活节奏' },
  { age: '6-9月', eat: '每4小时+2-3次辅食', activity: '坐、爬、互动(45-60分钟)', sleep: '上午下午各一觉', yourTime: '较完整的自由时间' },
  { age: '9-12月', eat: '3餐+2次点心', activity: '站立、行走探索(60-90分钟)', sleep: '上午/下午各一觉（可能合并为1次）', yourTime: '同步大人的三餐节奏' },
];

export interface BabySleepGuide {
  age: string;
  totalSleep: string;
  napCount: string;
  napDuration: string;
  nightSleep: string;
  tips: string;
}

export const babySleepGuide: BabySleepGuide[] = [
  { age: '0-6周', totalSleep: '16-18h', napCount: '无规律', napDuration: '不定', nightSleep: '2-4h/段', tips: '不要在宝宝完全睡着后放下，要在昏昏欲睡时放下(实用程序育儿法)' },
  { age: '6周-3月', totalSleep: '15-16h', napCount: '4-5次', napDuration: '30min-2h', nightSleep: '4-6h/段', tips: '建立固定的睡前程序：洗澡-按摩-喂奶-安静-放下' },
  { age: '3-6月', totalSleep: '14-15h', napCount: '3-4次', napDuration: '1-2h', nightSleep: '6-8h', tips: '使用抱起-放下法进行睡眠训练(第6章)；观察E.A.S.Y.信号' },
  { age: '6-9月', totalSleep: '14h', napCount: '2-3次', napDuration: '1-2h', nightSleep: '10-12h', tips: '分离焦虑期可能出现睡眠倒退，坚持睡前程序' },
  { age: '9-12月', totalSleep: '13-14h', napCount: '2次', napDuration: '1-1.5h', nightSleep: '11-12h', tips: '可能准备过渡到1次午觉' },
  { age: '1-2岁', totalSleep: '12-14h', napCount: '1-2次', napDuration: '1-2h', nightSleep: '11-12h', tips: '建立固定的睡前仪式，保持一致性' },
];

export const sleepTrainingMethods = [
  { method: '抱起-放下法 (PU/PD)', source: '实用程序育儿法第6章', description: '宝宝哭时抱起安抚，停止哭闹后立即放回婴儿床，重复直到入睡', suitable: '3个月以上', note: '需要耐心，第一晚可能需抱起20-100次' },
  { method: '唤醒去睡法', source: '实用程序育儿法', description: '在宝宝通常醒来的时间前15-30分钟轻轻唤醒他，打乱他的生物钟循环', suitable: '有规律的夜间醒来', note: '适用于习惯性早醒' },
  { method: '4S程序', source: '实用程序育儿法第5章', description: '设定环境(Setting) - 裹襁褓(Swaddling) - 坐着(Sitting) - 嘘拍(Shush-pat)', suitable: '0-3个月', note: '帮助宝宝进入安静状态' },
  { method: '渐进消退法', source: '梅奥育儿全书', description: '逐步延长回应时间，让宝宝学会自我安抚', suitable: '4个月以上', note: '逐步进行，每天延长等待时间' },
];

// ======== 喂养指南 ========

export const feedingGuide = {
  breastfeeding: {
    frequency_newborn: '每2-3小时，每天8-12次',
    duration: '每次15-30分钟/侧',
    hunger_signals: '咂嘴、伸舌头、转头、吮吸手指(哭是最后的饥饿信号)',
    enough_signals: '每天6-8片湿尿布、体重正常增长、喂后满足安静',
    storage: '室温<25度可存4h，冷藏3天，冷冻3-6月',
    positions: ['摇篮式', '橄榄球式', '侧躺式', '横跨式'],
  },
  formula: {
    preparation: '用70度以上热水冲泡以杀菌，冷却至体温再喂',
    amount: '每公斤体重约150ml/天，分6-8次',
    safety: '泡好的奶在室温下存放不超过2小时',
  },
  solids: {
    when: '约6个月，具备以下信号：能坐稳、对食物有兴趣、舌推反射消失',
    first: '高铁米粉(强化铁)，然后蔬菜泥、水果泥、肉泥',
    order: '单一食材引入，每次3-5天观察过敏反应',
    avoid: '1岁前不吃蜂蜜(肉毒杆菌)、整颗坚果(窒息风险)、添加糖盐',
    portions: '6-8月: 1-2餐，每次2-4勺\n8-10月: 2-3餐，手指食物\n10-12月: 3餐+1-2点心',
  },
};

// ======== 生长发育里程碑 ========

export interface Milestone {
  age: string;
  grossMotor: string;
  fineMotor: string;
  language: string;
  social: string;
}

export const milestones: Milestone[] = [
  { age: '1月', grossMotor: '俯卧时抬头片刻', fineMotor: '握拳，抓握反射', language: '发出咕咕声', social: '注视人脸，偏好妈妈声音' },
  { age: '2月', grossMotor: '俯卧时抬头45度', fineMotor: '手半张开', language: '发出元音(啊、哦)', social: '社交性微笑' },
  { age: '3月', grossMotor: '俯卧时抬头90度，踢腿', fineMotor: '看手，摇晃玩具', language: '笑出声', social: '认识熟悉的人' },
  { age: '4月', grossMotor: '从俯卧翻身到仰卧', fineMotor: '伸手抓物，放入嘴', language: '咿呀学语', social: '对镜子笑' },
  { age: '6月', grossMotor: '独坐，双向翻身', fineMotor: '换手、敲打玩具', language: '发出辅音(ba,da)', social: '认生，区分熟人和陌生人' },
  { age: '9月', grossMotor: '匍匐爬行、扶站', fineMotor: '拇指食指捏取(钳形抓握)', language: '模仿声音，懂"不"', social: '分离焦虑，玩躲猫猫' },
  { age: '12月', grossMotor: '独站、可能走几步', fineMotor: '放物入容器，翻书页', language: '有意识叫爸妈，1-3个词', social: '挥手再见，模仿动作' },
  { age: '18月', grossMotor: '独立行走、可能跑', fineMotor: '搭2-3块积木，用勺子', language: '10-25个词', social: '指物分享，简单模仿家务' },
  { age: '24月', grossMotor: '跑、踢球、上下楼梯', fineMotor: '搭4-6块积木，画线', language: '50+词，2词短语', social: '平行游戏，开始独立宣言' },
];

// ======== 疫苗接种时间表 (中国免疫规划) ========

export interface Vaccine {
  name: string;
  age: string;
  type: string;
  note: string;
}

export const vaccines: Vaccine[] = [
  { name: '乙肝疫苗(第1剂)', age: '出生24h内', type: '一类(免费)', note: '' },
  { name: '卡介苗', age: '出生后', type: '一类(免费)', note: '预防结核病' },
  { name: '乙肝疫苗(第2剂)', age: '1月', type: '一类(免费)', note: '' },
  { name: '脊髓灰质炎疫苗(第1剂)', age: '2月', type: '一类(免费)', note: '脊灰灭活疫苗IPV' },
  { name: '百白破疫苗(第1剂)', age: '3月', type: '一类(免费)', note: '百日咳、白喉、破伤风' },
  { name: '脊髓灰质炎疫苗(第2剂)', age: '3月', type: '一类(免费)', note: '' },
  { name: '百白破疫苗(第2剂)', age: '4月', type: '一类(免费)', note: '' },
  { name: '脊髓灰质炎疫苗(第3剂)', age: '4月', type: '一类(免费)', note: '' },
  { name: '百白破疫苗(第3剂)', age: '5月', type: '一类(免费)', note: '' },
  { name: '乙肝疫苗(第3剂)', age: '6月', type: '一类(免费)', note: '' },
  { name: 'A群流脑疫苗(第1剂)', age: '6月', type: '一类(免费)', note: '' },
  { name: '麻腮风疫苗(第1剂)', age: '8月', type: '一类(免费)', note: '麻疹、腮腺炎、风疹' },
  { name: '乙脑减毒活疫苗(第1剂)', age: '8月', type: '一类(免费)', note: '流行性乙型脑炎' },
  { name: 'A群流脑疫苗(第2剂)', age: '9月', type: '一类(免费)', note: '' },
  { name: '百白破疫苗(第4剂)', age: '18月', type: '一类(免费)', note: '加强' },
  { name: '麻腮风疫苗(第2剂)', age: '18月', type: '一类(免费)', note: '' },
  { name: '甲肝减毒活疫苗', age: '18月', type: '一类(免费)', note: '' },
  { name: '乙脑减毒活疫苗(第2剂)', age: '2岁', type: '一类(免费)', note: '' },
  { name: '脊髓灰质炎疫苗(第4剂)', age: '4岁', type: '一类(免费)', note: '加强' },
  { name: '百白破疫苗(第5剂)', age: '6岁', type: '一类(免费)', note: '白破二联' },
];


// ======== 宝宝常见病症参考 (梅奥育儿全书 + 崔玉涛) ========

export interface CommonIllness {
  name: string;
  symptoms: string;
  care: string;
  seeDoctor: string;
}

export const commonIllnesses: CommonIllness[] = [
  { name: '新生儿黄疸', symptoms: '皮肤和眼白发黄，出生2-3天后出现', care: '充分喂养促进排便，适当日光浴(间接)', seeDoctor: '黄疸加重、持续超过2周、大便发白' },
  { name: '湿疹/特应性皮炎', symptoms: '皮肤红斑、干燥、瘙痒', care: '保湿霜厚涂、避免过热、纯棉衣物、剪短指甲', seeDoctor: '大面积感染、影响睡眠' },
  { name: '感冒/上呼吸道感染', symptoms: '流涕、鼻塞、咳嗽、可能发热', care: '海盐水喷鼻、吸鼻器、加湿器、多喝奶/水', seeDoctor: '呼吸急促、持续高热、精神萎靡' },
  { name: '腹泻', symptoms: '大便次数增多、稀水便', care: '继续喂养防止脱水，口服补液盐，观察尿量', seeDoctor: '血便、持续呕吐、脱水(尿量明显减少)' },
  { name: '便秘', symptoms: '大便干硬、排便困难', care: '增加水分、腹部按摩、蹬自行车运动', seeDoctor: '持续超过一周、伴腹痛呕吐' },
  { name: '发热', symptoms: '体温>37.5度（腋下）', care: '物理降温(温水擦身)、正常喂奶/水、观察精神状态', seeDoctor: '3月以下婴儿体温>38度、持续>3天、伴抽搐' },
  { name: '肠绞痛', symptoms: '每天傍晚/夜间大哭、双腿蜷缩、放屁多', care: '飞机抱、白噪音、腹部顺时针按摩、襁褓', seeDoctor: '哭闹伴随呕吐、血便、体重不增' },
  { name: '尿布疹', symptoms: '臀部皮肤红、可能破皮', care: '勤换尿布(每2-3h)、清水冲洗、涂抹护臀膏、晾屁屁', seeDoctor: '破皮感染、蔓延到其他部位、真菌感染' },
];

// ======== 蒙台梭利感官训练 (0-3岁) ========

export interface SensoryGame {
  age: string;
  category: string;
  activity: string;
  materials: string;
  goal: string;
}

export const sensoryGames: SensoryGame[] = [
  { age: '0-3月', category: '视觉', activity: '黑白卡追视', materials: '黑白对比卡片', goal: '视觉追踪、聚焦能力' },
  { age: '0-3月', category: '听觉', activity: '轻声呼唤名字', materials: '摇铃、轻柔音乐', goal: '听觉定位、声音辨识' },
  { age: '0-3月', category: '触觉', activity: '抚触按摩', materials: '不同材质布料(丝、棉、绒)', goal: '触觉感知、安全感' },
  { age: '3-6月', category: '触觉', activity: '抓握不同材质玩具', materials: '布书、硅胶牙胶、木质环', goal: '手部触觉分辨' },
  { age: '3-6月', category: '视觉', activity: '彩色吊饰', materials: '彩色纸片、风铃', goal: '色彩感知' },
  { age: '6-9月', category: '触觉', activity: '感官篮探索', materials: '不同质感物品(毛球、木块、海绵)', goal: '多材质探索' },
  { age: '6-9月', category: '听觉', activity: '敲打不同器皿', materials: '木勺+不锈钢盆/塑料碗', goal: '分辨不同声音' },
  { age: '9-12月', category: '精细动作', activity: '投放游戏', materials: '小球放入盒子的孔中', goal: '手眼协调、因果理解' },
  { age: '9-12月', category: '嗅觉', activity: '闻不同香料', materials: '薄荷、柠檬皮、薰衣草', goal: '嗅觉辨识' },
  { age: '12-18月', category: '感官综合', activity: '感官步道', materials: '不同材质垫子(草地垫、泡沫垫)', goal: '脚底触觉刺激' },
  { age: '18-24月', category: '味觉', activity: '盲品水果', materials: '不同味道水果切块', goal: '味觉辨识能力' },
  { age: '18-24月', category: '精细动作', activity: '倒水练习', materials: '小水壶+小杯子', goal: '手腕控制、专注力' },
];

// ======== 正面管教核心原则 (简·尼尔森) ========

export const positiveDiscipline = {
  principles: [
    '和善与坚定并行：既尊重孩子也尊重自己',
    '帮助孩子获得归属感和价值感',
    '长期有效：惩罚短期有效，长期负面',
    '教给孩子有价值的社会和人生技能',
    '引导孩子发现自己的能力',
  ],
  tools: [
    { tool: '家庭会议', desc: '定期家庭会议，讨论问题、计划活动、表达感谢', age: '3岁+' },
    { tool: '启发式提问', desc: '不告诉孩子该做什么，而是问"你觉得该怎么解决？"', age: '2岁+' },
    { tool: '选择轮', desc: '给孩子两个可接受的选择，让他自己做决定', age: '2岁+' },
    { tool: '积极的暂停', desc: '情绪激动时暂停而非惩罚，冷静后再解决问题', age: '3岁+' },
    { tool: '自然后果', desc: '让孩子体验行为的自然后果（非人为惩罚）', age: '18月+' },
    { tool: '鼓励 vs 表扬', desc: '鼓励关注努力和过程（"你很努力"），而非结果（"你真聪明"）', age: '0岁+' },
  ],
  fourRs: [
    { title: 'Related 相关', desc: '后果必须与行为直接相关' },
    { title: 'Respectful 尊重', desc: '后果执行时不带羞辱、责备或痛苦' },
    { title: 'Reasonable 合理', desc: '从孩子的角度出发是合理的' },
    { title: 'Revealed 预先告知', desc: '事先让孩子知道如果选择A会发生什么' },
  ],
};

// ======== 看见孩子 (Becky Kennedy) 核心洞察 ========

export const goodInside = {
  core_truth: '本心善良 - 孩子的行为可能有问题，但作为一个人从根本上是好的',
  insights: [
    '行为是一扇窗：每一次"不良行为"都是孩子内在挣扎的线索',
    '两个真相：理解孩子不等于纵容孩子；你可以同时设置边界和验证感受',
    '连接先于纠正：感到被理解的孩子更愿意合作',
    '修复大于完美：破裂后的修复比从不破裂更有价值',
  ],
  strategies: [
    '孩子发脾气时：不要说"别哭了"，说"这很难，我在你身边"',
    '孩子攻击时：不要说"不许打人"，说"我不会让你打我，但我在这陪着你"',
    '孩子失败时：不要说"没关系"，说"这真的很让人失望，我们都在学习"',
  ],
};

// ======== 产后恢复 ========

export const postpartumRecovery = [
  { topic: '子宫恢复', detail: '6周内子宫恢复到孕前大小，可能伴随类似经痛的子宫收缩，哺乳时更明显' },
  { topic: '恶露', detail: '产后持续4-6周，从鲜红逐渐变淡至粉色、白色' },
  { topic: '会阴护理', detail: '侧切/撕裂缝线约2周吸收，伤口约6周愈合。用温水冲洗、冰敷缓解不适' },
  { topic: '排尿', detail: '产后可能排尿困难，用挤水壶刺激会阴，每2小时尝试排尿一次' },
  { topic: '漏尿', detail: '产后漏尿正常，几个月内会大幅改善，坚持凯格尔运动' },
  { topic: '乳房护理', detail: '清水清洗即可，避免沐浴露。乳头皲裂涂少量母乳/羊脂膏。胀奶可冷敷和挤奶' },
  { topic: '便秘', detail: '产后前几天不排便是正常现象，多喝水、多吃纤维食物。超过4天告知医生' },
  { topic: '心理调适', detail: '可能经历"产后情绪低落"(Baby Blues)，持续2周以上需警惕产后抑郁' },
];

// ======== 类型定义 ========

export interface BabyProfile {
  name: string;
  birthDate: string;
  gender: string;
}

export interface FeedRecord {
  id: string;
  time: string;
  type: 'breast' | 'formula';
  side?: 'left' | 'right';
  duration?: number; // minutes for breastfeeding
  amount?: number; // ml for formula feeding
}

export interface SleepRecord {
  id: string;
  startTime: string;
  endTime: string;
  quality: 'good' | 'fair' | 'poor';
}

export interface DiaperRecord {
  id: string;
  time: string;
  type: 'wet' | 'dirty' | 'both';
  note?: string;
}

export interface GrowthRecord {
  id: string;
  date: string;
  weight: number; // kg
  height: number; // cm
  headCirc: number; // cm
}

export interface SymptomRecord {
  id: string;
  date: string;
  symptom: string;
  severity: 1 | 2 | 3 | 4 | 5;
  note: string;
}

