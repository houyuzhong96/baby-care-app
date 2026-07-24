
// ======== 增强食谱与饮食数据 (来源: Pregnancy-Knowledge GitHub) ========

export interface MealPlan {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  nutrients: string[];
  trimester?: 'all' | 'first' | 'second' | 'third';
}

export interface DailyServings {
  category: string;
  servings: string;
  examples: string;
}

export const dailyServings: DailyServings[] = [
  { category: '蛋白质', servings: '3份', examples: '110g瘦肉/鱼/禽, 240ml牛奶, 4个鸡蛋, 110g豆腐' },
  { category: '钙', servings: '4份', examples: '240ml牛奶/酸奶, 28g硬芝士, 85g带骨沙丁鱼, 110g带骨三文鱼' },
  { category: '维生素C', servings: '3份', examples: '番石榴, 彩椒, 猕猴桃, 橙子, 西兰花, 草莓' },
  { category: '维生素A', servings: '3-4份', examples: '胡萝卜, 红薯, 南瓜, 菠菜, 哈密瓜, 芒果' },
  { category: '其他蔬果', servings: '1-2份', examples: '苹果, 香蕉, 蓝莓, 梨, 黄瓜, 牛油果' },
  { category: '谷物和豆类', servings: '6份', examples: '80g糙米, 1片全麦面包, 85g熟豆类, 30g燕麦' },
  { category: '富铁食物', servings: '一些', examples: '瘦牛肉, 贝类, 青豆, 小扁豆, 豆腐, 菠菜, 黑巧克力' },
  { category: 'Omega-3', servings: '一些', examples: '三文鱼, 沙丁鱼, 核桃, 亚麻籽, 奇亚籽' },
  { category: '液体', servings: '10杯(240ml/杯)', examples: '水, 牛奶, 无咖啡因茶, 汤' },
  { category: '油脂', servings: '6小勺(30ml)', examples: '橄榄油, 菜籽油, 半个牛油果, 30g坚果' },
];

export const weeklyMealPlan: Record<string, string[]> = {
  '周一': ['早餐: 全麦面包+鸡蛋+牛奶+猕猴桃', '午餐: 糙米饭+清蒸三文鱼+西兰花', '晚餐: 红薯+鸡胸肉+菠菜沙拉', '加餐: 酸奶+核桃'],
  '周二': ['早餐: 燕麦粥+蓝莓+煮鸡蛋', '午餐: 全麦意面+番茄牛肉酱+生菜', '晚餐: 杂粮饭+豆腐虾仁+炒油菜', '加餐: 苹果+扁桃仁'],
  '周三': ['早餐: 豆浆+全麦馒头+炒菠菜', '午餐: 藜麦饭+沙丁鱼+胡萝卜丝', '晚餐: 小米粥+蒸鸡腿+炒四季豆', '加餐: 橙子+酸奶'],
  '周四': ['早餐: 牛奶+燕麦+香蕉片', '午餐: 糙米饭+清蒸鲈鱼+西兰花', '晚餐: 南瓜+瘦牛肉+番茄汤', '加餐: 牛油果+全麦饼干'],
  '周五': ['早餐: 红枣小米粥+水煮蛋+黄瓜', '午餐: 全麦卷饼+鸡肉丝+彩椒', '晚餐: 杂粮饭+带骨三文鱼+上海青', '加餐: 芒果+腰果'],
  '周六': ['早餐: 荞麦面+荷包蛋+菠菜', '午餐: 黑米饭+红烧牛肉+西葫芦', '晚餐: 玉米+虾仁蒸蛋+炒空心菜', '加餐: 草莓+酸奶'],
  '周日': ['早餐: 全麦吐司+牛油果+牛奶', '午餐: 藜麦+烤鸡胸+烤南瓜+沙拉', '晚餐: 燕麦粥+清蒸鱼+凉拌黄瓜', '加餐: 葡萄+核桃'],
};

export const trimesterMealTips = {
  first: {
    title: '孕早期(1-12周)',
    focus: '叶酸、维生素B6（缓解孕吐）',
    tips: [
      '早晨起床前吃几块饼干或面包缓解晨吐',
      '摄入足量维生素B6(香蕉、牛油果、鸡肉)',
      '每天600μg叶酸（绿叶菜、豆类、橙汁）',
      '少食多餐，避免空腹和油腻',
      '即使孕吐也要保证液体摄入',
    ],
  },
  second: {
    title: '孕中期(13-27周)',
    focus: '钙、铁、蛋白质',
    tips: [
      '每日额外300大卡热量预算',
      '钙摄入1000mg/天（牛奶、酸奶、芝士）',
      '铁摄入27mg/天（红肉、菠菜、豆类）',
      'DHA 200-300mg/天助大脑发育',
      '适度运动配合均衡营养',
    ],
  },
  third: {
    title: '孕晚期(28-40周)',
    focus: 'DHA、纤维、钙',
    tips: [
      'Omega-3摄入有助于宝宝睡眠质量',
      '每日一小块黑巧克力可能让宝宝更安静',
      '高纤维食物预防便秘',
      '少食多餐缓解烧心',
      '控制盐分摄入预防水肿',
    ],
  },
};

// ======== 更多孕期症状数据 (来自GitHub) ========

export interface DetailedSymptom {
  name: string;
  description: string;
  solutions: string[];
  whenToCallDoctor: string;
}

export const detailedSymptoms: DetailedSymptom[] = [
  { name: '痘痘/痤疮', description: '由于荷尔蒙变化皮脂腺分泌增加', solutions: ['温和洁面每天两次', '使用无油护肤品', '不要挤压痘痘', '多喝水'], whenToCallDoctor: '严重囊肿型痤疮' },
  { name: '腕管综合征', description: '孕期体内液体增加压迫手腕神经', solutions: ['手腕夹板(尤其夜间)', '避免重复手腕动作', '抬高手臂', '冷敷'], whenToCallDoctor: '疼痛严重影响睡眠或日常活动' },
  { name: '头晕', description: '孕期低血压、低血糖或贫血可能导致头晕', solutions: ['缓慢变换姿势', '不要长时间站立', '侧卧休息', '少量多餐保持血糖'], whenToCallDoctor: '频繁昏厥、视物模糊、严重头痛' },
  { name: '头疼', description: '激素变化、疲劳、饥饿或脱水', solutions: ['冷敷额头', '休息在安静暗室', '温热敷颈肩', '保持水分和规律饮食'], whenToCallDoctor: '持续剧烈头痛、视物模糊、上肢水肿' },
  { name: '静脉扩张', description: '孕期血容量增加导致静脉扩张', solutions: ['避免长时间站立', '抬高腿部', '左侧卧睡眠', '穿压力袜'], whenToCallDoctor: '红肿疼痛、触之发热(可能血栓)' },
  { name: '妊娠纹', description: '皮肤弹性纤维断裂，受遗传影响', solutions: ['保持健康体重增长速度', '涂抹保湿霜', '多喝水保持皮肤水分'], whenToCallDoctor: '通常无需医疗干预' },
  { name: '牙龈炎和出血', description: '孕期激素使牙龈对牙菌斑更敏感', solutions: ['软毛牙刷轻柔刷牙', '每天使用牙线', '定期看牙医', '用温水漱口'], whenToCallDoctor: '严重牙龈肿痛或牙齿松动' },
  { name: '皮肤痒', description: '皮肤拉伸、干燥或孕期胆汁淤积', solutions: ['燕麦浴或小苏打浴', '温和无香型保湿霜', '穿宽松棉质衣物', '避免热水澡'], whenToCallDoctor: '全身剧烈瘙痒(尤其手心脚心)、黄疸' },
  { name: '臀部和腿疼(坐骨神经痛)', description: '胎儿压迫或姿势改变', solutions: ['侧卧、两膝间放枕头', '热敷或冷敷', '温和拉伸', '避免提重物'], whenToCallDoctor: '进行性加重、影响行走' },
  { name: '肋骨酸痛', description: '子宫增大压迫肋骨', solutions: ['穿宽松衣物', '经常变换姿势', '将手臂举过头顶伸展', '热敷'], whenToCallDoctor: '持续剧痛不缓解' },
  { name: '脸部皮肤变黑(黄褐斑)', description: '激素变化导致黑色素沉着', solutions: ['严格防晒(SPF30+)', '戴宽檐帽', '避免刺激性护肤品'], whenToCallDoctor: '通常产后自行消退' },
  { name: '过敏', description: '孕期免疫系统变化可能加重或缓解过敏', solutions: ['避免已知过敏原', '海盐水洗鼻', '加湿器'], whenToCallDoctor: '呼吸困难、需用药时请咨询医生' },
  { name: '视觉模糊', description: '体液变化影响角膜', solutions: ['避免揉眼', '充足休息', '使用人工泪液'], whenToCallDoctor: '突然视力变化、飞蚊、闪光感(可能子痫前期)' },
  { name: '乳头溢液', description: '孕期晚期初乳可能开始分泌', solutions: ['使用防溢乳垫', '保持清洁'], whenToCallDoctor: '溢液含血或脓' },
  { name: '会阴疼', description: '骨盆压力增加', solutions: ['Kegel运动', '避免久站', '冷敷'], whenToCallDoctor: '剧烈疼痛或影响排尿' },
];

// ======== 新生儿护理 (来自0-5岁带娃宝典) ========

export interface BabyFeedingPattern {
  type: string;
  description: string;
  strategy: string;
}

export const babyFeedingPatterns: BabyFeedingPattern[] = [
  { type: '掠食鱼型', description: '快速猛吃，效率高但可能吞入过多空气', strategy: '频繁拍嗝，控制流速' },
  { type: '兴奋但低效型', description: '看到乳房/奶瓶就兴奋但含乳困难，容易哭闹', strategy: '先安抚再喂，保持环境安静' },
  { type: '拖拉型', description: '慢慢吃，容易睡着', strategy: '轻轻触碰脸颊或脚底保持清醒' },
  { type: '美食家型', description: '喜欢慢慢品味，需要先舔/玩一会才开始吃', strategy: '耐心等待，不要催促' },
  { type: '吃吃停停型', description: '吃一会儿休息一会儿', strategy: '给足够时间，不急于换边' },
];

export const breastmilkStorage = [
  { temp: '室温(<25度)', duration: '4小时' },
  { temp: '冷藏(4度)', duration: '3天(冰箱内部，非门架)' },
  { temp: '冷冻(-18度)', duration: '3-6个月' },
  { temp: '解冻后(冷藏)', duration: '24小时内使用' },
  { temp: '已加热未吃完', duration: '1-2小时内丢弃' },
];

export const newbornCareBasics = {
  head: '新生儿头部可能因产道挤压而变形，几周内会自行恢复。前囟门（头顶软处）约12-18月闭合。',
  skin: '可能出现胎脂、粟粒疹(白色小点)、新生儿痤疮，均属正常现象。',
  eyes: '可能双眼运动不协调，3-4月后改善。泪水管可能未通导致眼屎多。',
  hair: '胎发可能脱落然后重新长出，颜色和质地可能变化。',
  procedures: [
    { name: '维生素K注射', purpose: '预防维生素K缺乏性出血（新生儿自身维生素K不足）' },
    { name: '乙肝疫苗(第1剂)', purpose: '预防乙型肝炎病毒感染' },
    { name: '眼部预防', purpose: '预防淋菌和衣原体眼部感染（部分医院）' },
    { name: '新生儿筛查', purpose: '足跟血筛查遗传代谢性疾病' },
    { name: '听力筛查', purpose: '早期发现先天性听力障碍' },
  ],
};

export const babyClothingGuide = [
  '买大1-2号，新生儿长得极快',
  '选择阻燃材料的睡衣',
  '选裆部有按扣的连体衣方便换尿布',
  '避免有领带、蝴蝶结等窒息风险的衣物',
  '新生儿不需要穿鞋',
  '纯棉材质优先，避免化纤刺激皮肤',
];

// ======== 母乳喂养更多数据 ========

export const breastfeedingChecklist = [
  '宝宝是否正确含乳（嘴唇外翻、深含乳）？',
  '能听到吞咽声吗？',
  '喂奶姿势舒适吗？',
  '每天有6-8片湿尿布吗？',
  '宝宝体重正常增长吗？',
  '喂完奶后乳房变软吗？',
  '乳头有疼痛或皲裂吗？',
  '宝宝精神好吗？',
];

export const breastfeedingVitamins = {
  continue: ['继续服用孕期维生素', '维生素D补充400IU/天(通过妈妈或直接给宝宝)'],
  avoid: ['某些草药可能影响泌乳量', '避免烟草和酒精'],
};

export const engorgementCare = [
  '频繁哺乳或泵奶(每2-3小时)',
  '喂奶前热敷促进乳汁流出',
  '喂奶后冷敷减轻肿胀',
  '卷心菜叶冷敷（传统有效方法）',
  '轻柔按摩乳房硬块处',
];

export const blockedDuctCare = [
  '优先用胀痛侧乳房喂奶',
  '喂奶时按摩硬块处',
  '变换哺乳姿势（不同姿势引流不同乳管）',
  '确保胸罩不要太紧',
  '多休息、多饮水',
];

export const mastitisSigns = {
  symptoms: ['乳房红肿热痛', '发热(>38度)', '全身发冷、乏力', '类似感冒症状'],
  action: '继续哺乳！排空乳房有助于恢复。立即就医，可能需要抗生素。',
};
