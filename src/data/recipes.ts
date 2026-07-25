
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

// ======== 中式孕期食谱 ========

export interface ChineseRecipe {
  name: string;
  category: '海鲜' | '牛肉' | '猪肉' | '鸡肉' | '蔬菜' | '汤羹' | '主食';
  mealType: '早餐' | '午餐' | '晚餐' | '加餐';
  trimester: ('first' | 'second' | 'third')[];
  ingredients: string;
  method: string;
  nutrition: string;
  tips: string;
}

export const chineseRecipes: ChineseRecipe[] = [
  // ===== 海鲜类 =====
  { name: '清蒸鲈鱼', category: '海鲜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '鲈鱼1条(约500g)、姜片、葱丝、蒸鱼豉油、料酒', method: '鲈鱼洗净划几刀，抹少许料酒和盐，放姜片。蒸锅水开后放入，大火蒸8分钟。取出倒掉汁水，放葱丝，淋热油和蒸鱼豉油。', nutrition: '鲈鱼蛋白优质易吸收、DHA含量丰富、低汞安全', tips: '孕期最佳鱼类之一。蒸制保留营养，避免油炸。' },
  { name: '三文鱼豆腐汤', category: '海鲜', mealType: '晚餐', trimester: ['second', 'third'], ingredients: '三文鱼200g、嫩豆腐1块、番茄1个、姜片、葱花', method: '三文鱼切块用少许盐和胡椒腌10分钟。番茄切块炒出汁加水煮开。放豆腐和三文鱼，小火煮5分钟。撒葱花。', nutrition: 'DHA+Omega-3、豆腐补钙、番茄VC助铁吸收', tips: 'DHA对胎儿大脑发育至关重要，孕中晚期每周2-3次深海鱼。' },
  { name: '虾仁蒸蛋', category: '海鲜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '鸡蛋2个、鲜虾仁100g、温水150ml、盐、香油', method: '鸡蛋打散加温水（约蛋液1.5倍）和少许盐搅匀过滤。虾仁放在蛋液上。盖保鲜膜戳几个孔，中火蒸8分钟。淋香油。', nutrition: '优质蛋白+低脂、虾仁补锌、鸡蛋含胆碱和叶黄素', tips: '过滤和盖膜是关键，让蒸蛋滑嫩无蜂窝。孕早期胃口不好时很友好。' },
  { name: '蛤蜊冬瓜汤', category: '海鲜', mealType: '晚餐', trimester: ['second', 'third'], ingredients: '蛤蜊300g、冬瓜300g、姜片、葱、盐', method: '蛤蜊吐沙洗净。冬瓜去皮切块。水烧开放姜片和冬瓜煮5分钟。放蛤蜊煮至开口，加盐撒葱。', nutrition: '蛤蜊补锌、冬瓜利尿消肿（孕晚期水肿适用）', tips: '蛤蜊一定要鲜活，开口后立即捞出免得老了。孕晚期水肿的妈妈多喝这个汤。' },
  { name: '葱油鲳鱼', category: '海鲜', mealType: '午餐', trimester: ['second', 'third'], ingredients: '鲳鱼1条、姜丝、葱丝、蒸鱼豉油、生抽、油', method: '鲳鱼洗净划刀，放姜丝，蒸8分钟。取出倒掉水，铺大量葱丝。热油浇在葱丝上，淋豉油和生抽。', nutrition: '鲳鱼肉嫩刺少、富含蛋白和硒', tips: '葱丝要多才香。鲳鱼是低汞鱼类，孕期安全。' },

  // ===== 牛肉类 =====
  { name: '番茄炖牛腩', category: '牛肉', mealType: '午餐', trimester: ['second', 'third'], ingredients: '牛腩500g、番茄3个、洋葱半个、姜片、八角1个、生抽、料酒', method: '牛腩焯水切块。洋葱炒香，放番茄炒出汁。加入牛腩、姜片、八角、料酒、生抽，加水没过。大火烧开转小火炖1.5小时至牛腩软烂。', nutrition: '牛肉补铁补血（孕期贫血首选）、番茄VC助铁吸收', tips: '孕期缺铁性贫血常见，每周2-3次牛肉有助预防。番茄的VC是植物性铁吸收的关键。' },
  { name: '西兰花炒牛肉', category: '牛肉', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '牛里脊200g、西兰花1颗、蒜末、蚝油、生抽、淀粉', method: '牛肉切片用生抽+淀粉+油腌15分钟。西兰花焯水。牛肉滑炒至变色盛出。爆香蒜末，放西兰花和牛肉翻炒，加蚝油调味。', nutrition: '牛肉补铁+蛋白、西兰花叶酸+VC+钙', tips: '牛肉逆纹切更嫩。西兰花焯水时加一点盐和油保持翠绿。' },
  { name: '胡萝卜炖牛肉', category: '牛肉', mealType: '晚餐', trimester: ['second', 'third'], ingredients: '牛肉500g、胡萝卜2根、土豆1个、姜片、料酒、生抽、八角', method: '牛肉焯水。所有材料放入锅中加水，大火烧开转小火炖1.5小时。最后加盐调味。', nutrition: '牛肉补铁、胡萝卜β-胡萝卜素转VA、土豆补充碳水', tips: '一锅炖最省事——有肉有菜有主食。胡萝卜的VA对胎儿视力发育好。' },

  // ===== 猪肉类 =====
  { name: '瘦肉炒时蔬', category: '猪肉', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '猪瘦肉150g、当季蔬菜（油菜/空心菜/菠菜）、蒜末、生抽、盐', method: '瘦肉切片用生抽和淀粉腌10分钟。热油滑炒肉片盛出。炒香蒜末，大火炒蔬菜，放肉片翻炒调味出锅。', nutrition: '瘦肉优质蛋白、时蔬提供多种维生素和膳食纤维', tips: '蔬菜要大火快炒保持脆嫩和营养。季节菜更便宜更好吃。' },
  { name: '红枣枸杞排骨汤', category: '猪肉', mealType: '晚餐', trimester: ['second', 'third'], ingredients: '猪排骨500g、红枣8颗、枸杞一小把、姜片、盐', method: '排骨焯水。所有材料（除枸杞）放入锅中加水。大火烧开转小火炖1.5小时。出锅前10分钟加枸杞和盐。', nutrition: '排骨补钙补蛋白、红枣补血、枸杞明目', tips: '枸杞不要久煮。此汤温和滋补，孕中晚期多喝。' },
  { name: '糖醋里脊（改良版）', category: '猪肉', mealType: '午餐', trimester: ['second', 'third'], ingredients: '猪里脊200g、番茄酱、醋、糖少量、蛋清、淀粉', method: '里脊切条用蛋清+淀粉抓匀。少油炸至金黄捞出。锅中留少许油放番茄酱+醋+少量糖炒汁，放里脊翻炒裹匀。', nutrition: '猪里脊蛋白丰富、改良版少油少糖', tips: '孕期可以偶尔吃——比传统版少油少糖更适合。偶尔犒劳自己。' },

  // ===== 鸡肉类 =====
  { name: '香菇蒸鸡', category: '鸡肉', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '鸡腿肉300g、干香菇5朵、姜丝、生抽、蚝油、料酒、淀粉', method: '香菇泡发切片。鸡腿肉去骨切块用生抽+蚝油+料酒+淀粉腌20分钟。香菇铺底放鸡肉和姜丝。蒸锅水开后大火蒸15分钟。', nutrition: '鸡肉低脂高蛋白易消化、香菇增强免疫', tips: '蒸制做法少油烟、营养保留好。孕早期胃口差吃这个不油腻。' },
  { name: '鸡汤面', category: '鸡肉', mealType: '早餐', trimester: ['first', 'second', 'third'], ingredients: '鸡腿1个、面条、青菜、姜片、盐', method: '鸡腿焯水后加水+姜片炖1小时成鸡汤。捞出鸡肉撕丝。煮面+青菜，浇鸡汤和鸡肉丝。', nutrition: '鸡汤温和滋补、面条提供碳水能量、青菜补充纤维', tips: '鸡汤可以一次多炖一些分装冷冻。孕吐严重时一碗鸡汤面比什么都治愈。' },
  { name: '彩椒炒鸡胸', category: '鸡肉', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '鸡胸肉200g、红黄彩椒各半个、蒜片、生抽、蚝油、淀粉', method: '鸡胸切片用生抽+淀粉+油腌10分钟。滑炒鸡肉盛出。蒜片爆香炒彩椒，放鸡肉翻炒调味。', nutrition: '鸡胸低脂高蛋白、彩椒VC含量极高(是橙子的3倍)', tips: '鸡胸肉嫩滑的秘诀是腌的时候加一点油和淀粉。彩椒的VC助铁吸收。' },
  { name: '药膳炖鸡汤', category: '鸡肉', mealType: '晚餐', trimester: ['third'], ingredients: '老母鸡半只、红枣、枸杞、黄芪3片、姜片', method: '鸡肉焯水。所有材料入锅大火烧开转小火炖2小时。出锅前加枸杞和盐。', nutrition: '黄芪补气、红枣枸杞补血明目、鸡肉补虚', tips: '孕晚期体力消耗大，适量的药膳滋补有帮助。黄芪用量不宜多（<5片）。感冒或上火时不要喝。' },

  // ===== 时令蔬菜类 =====
  { name: '蒜蓉西兰花', category: '蔬菜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '西兰花1颗、蒜末、盐、橄榄油', method: '西兰花焯水1分钟捞出。热少许橄榄油炒香蒜末，放西兰花翻炒加盐。', nutrition: '西兰花叶酸+VC+钙+膳食纤维，孕期超级食物', tips: '不要焯太久保持脆嫩。西兰花是孕期营养最全面的蔬菜之一。' },
  { name: '清炒时蔬', category: '蔬菜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '当季绿叶菜（菠菜/油菜/空心菜/苋菜/小白菜）、蒜末、盐', method: '蔬菜摘洗干净。热油爆香蒜末，放入蔬菜大火快炒。变软后加盐立即出锅。', nutrition: '时蔬提供叶酸+铁+维C+纤维', tips: '大火快炒是关键，时间长了蔬菜出水变黄失营养。不同季节换不同菜。' },
  { name: '番茄炒蛋', category: '蔬菜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '番茄2个、鸡蛋3个、葱花、盐、少许糖', method: '鸡蛋打散炒熟盛出。番茄切块炒出汁。放回鸡蛋翻炒，加盐和少许糖，撒葱花。', nutrition: '鸡蛋优质蛋白+胆碱、番茄番茄红素+VC', tips: '最经典的中式家常菜。番茄炒出汁再放鸡蛋才好吃。' },
  { name: '麻婆豆腐（温和版）', category: '蔬菜', mealType: '午餐', trimester: ['second', 'third'], ingredients: '嫩豆腐1块、猪肉末50g、豆瓣酱少量、花椒粉少量、葱花', method: '豆腐切块焯水。少许油炒肉末，加少量豆瓣酱炒香。放水+豆腐小火煮3分钟。水淀粉勾芡，撒花椒粉和葱花。', nutrition: '豆腐补钙优质蛋白、猪肉末补铁', tips: '孕期版减辣减油不要太多豆瓣酱。豆腐焯水后不容易碎。' },
  { name: '山药木耳炒肉片', category: '蔬菜', mealType: '午餐', trimester: ['first', 'second', 'third'], ingredients: '山药200g、泡发木耳100g、瘦肉100g、姜片、盐', method: '山药去皮切片泡水防氧化。肉片用生抽+淀粉腌。滑炒肉片盛出。姜片爆香炒山药和木耳，放肉片加盐。', nutrition: '山药健脾养胃、木耳补铁清肺', tips: '山药去皮戴手套不然手痒。孕早期脾胃不好多吃山药。' },

  // ===== 汤羹类 =====
  { name: '紫菜蛋花汤', category: '汤羹', mealType: '晚餐', trimester: ['first', 'second', 'third'], ingredients: '紫菜、鸡蛋1个、葱花、盐、香油', method: '水烧开放撕碎的紫菜。鸡蛋打散缓缓倒入汤中搅成蛋花。加盐、香油、葱花。', nutrition: '紫菜补碘（孕期碘需求220μg/天）、鸡蛋蛋白', tips: '最简单的补碘汤羹。碘对胎儿甲状腺发育至关重要。' },
  { name: '南瓜小米粥', category: '汤羹', mealType: '早餐', trimester: ['first', 'second', 'third'], ingredients: '小米100g、南瓜200g、红枣5颗', method: '南瓜去皮切小块。小米洗净，和南瓜+红枣一起加水煮粥。小火熬约30分钟至浓稠。', nutrition: '小米养胃、南瓜β-胡萝卜素转VA、红枣补血', tips: '孕早期晨吐严重时小米粥是最好的早餐——温和、不刺激、易消化。' },
  { name: '菠菜猪肝汤', category: '汤羹', mealType: '午餐', trimester: ['second', 'third'], ingredients: '猪肝100g、菠菜200g、姜片、料酒、枸杞', method: '猪肝切片用料酒+姜片腌10分钟去腥后焯水。水开放姜片和猪肝煮2分钟，放菠菜煮1分钟，加盐。', nutrition: '猪肝是铁+V-A之王、菠菜补铁补叶酸', tips: '孕期补血最强组合。猪肝每周1次不超过100g（V-A过量有风险）。' },
];

// ===== 每周食谱推荐（中式）=====

export const chineseWeeklyMealPlan: Record<string, { breakfast: string; lunch: string; dinner: string; snack: string }[]> = {
  '孕早期(1-12周)': [
    { breakfast: '南瓜小米粥+水煮蛋', lunch: '虾仁蒸蛋+蒜蓉西兰花+米饭', dinner: '紫菜蛋花汤+山药木耳炒肉片+馒头', snack: '苏打饼干+苹果' },
    { breakfast: '鸡汤面+荷包蛋', lunch: '清蒸鲈鱼+清炒时蔬+米饭', dinner: '番茄炖牛腩+米饭', snack: '香蕉+核桃' },
    { breakfast: '红枣小米粥+蒸红薯', lunch: '瘦肉炒时蔬+番茄炒蛋+米饭', dinner: '蛤蜊冬瓜汤+彩椒炒鸡胸+杂粮饭', snack: '酸奶+全麦面包' },
    { breakfast: '燕麦牛奶+水煮蛋+蓝莓', lunch: '香菇蒸鸡+蒜蓉西兰花+米饭', dinner: '山药木耳炒肉片+紫菜蛋花汤+馒头', snack: '猕猴桃+杏仁' },
    { breakfast: '杂粮粥+蒸南瓜', lunch: '西兰花炒牛肉+番茄炒蛋+米饭', dinner: '瘦肉炒时蔬+米饭', snack: '橙子+酸奶' },
    { breakfast: '小米粥+水煮蛋+蒸饺', lunch: '清蒸鲈鱼+清炒时蔬+米饭', dinner: '鸡汤面+青菜', snack: '苹果+核桃' },
    { breakfast: '红枣枸杞粥+全麦馒头', lunch: '虾仁蒸蛋+蒜蓉西兰花+米饭', dinner: '胡萝卜炖牛肉+清炒时蔬+杂粮饭', snack: '草莓+苏打饼干' },
  ],
  '孕中期(13-27周)': [
    { breakfast: '牛奶燕麦+全麦面包+水煮蛋', lunch: '番茄炖牛腩+清炒时蔬+米饭', dinner: '三文鱼豆腐汤+山药木耳炒肉片+杂粮饭', snack: '酸奶+坚果' },
    { breakfast: '小米粥+蒸红薯+水煮蛋', lunch: '清蒸鲈鱼+彩椒炒鸡胸+米饭', dinner: '红枣枸杞排骨汤+蒜蓉西兰花+馒头', snack: '橙子+核桃' },
    { breakfast: '杂粮豆浆+全麦馒头+水煮蛋', lunch: '西兰花炒牛肉+番茄炒蛋+米饭', dinner: '蛤蜊冬瓜汤+瘦肉炒时蔬+杂粮饭', snack: '香蕉+杏仁' },
    { breakfast: '鸡蛋羹+蒸玉米+牛奶', lunch: '葱油鲳鱼+清炒时蔬+米饭', dinner: '菠菜猪肝汤+山药木耳炒肉片+馒头', snack: '芒果+希腊酸奶' },
    { breakfast: '红薯粥+水煮蛋+猕猴桃', lunch: '香菇蒸鸡+麻婆豆腐(温和版)+米饭', dinner: '三文鱼豆腐汤+清炒时蔬+杂粮饭', snack: '苹果+全麦饼干' },
    { breakfast: '燕麦牛奶+蒸南瓜+水煮蛋', lunch: '糖醋里脊(改良版)+蒜蓉西兰花+米饭', dinner: '胡萝卜炖牛肉+番茄炒蛋+杂粮饭', snack: '草莓+核桃' },
    { breakfast: '红枣枸杞粥+全麦面包+水煮蛋', lunch: '清蒸鲈鱼+彩椒炒鸡胸+米饭', dinner: '蛤蜊冬瓜汤+瘦肉炒时蔬+馒头', snack: '酸奶+蓝莓' },
  ],
  '孕晚期(28-40周)': [
    { breakfast: '南瓜小米粥+水煮蛋+蒸饺', lunch: '清蒸鲈鱼+清炒时蔬+米饭', dinner: '冬瓜蛤蜊汤+番茄炒蛋+杂粮饭', snack: '希腊酸奶+核桃' },
    { breakfast: '燕麦牛奶+全麦面包+水煮蛋', lunch: '西兰花炒牛肉+蒜蓉西兰花+米饭', dinner: '药膳炖鸡汤+山药木耳炒肉片+馒头', snack: '黑巧克力一小块+奇异果' },
    { breakfast: '小米粥+蒸红薯+水煮蛋', lunch: '番茄炖牛腩+清炒时蔬+米饭', dinner: '葱油鲳鱼+瘦肉炒时蔬+杂粮饭', snack: '香蕉+杏仁' },
    { breakfast: '鸡蛋羹+蒸玉米+牛奶', lunch: '虾仁蒸蛋+彩椒炒鸡胸+米饭', dinner: '三文鱼豆腐汤+清炒时蔬+馒头', snack: '苹果+全麦饼干' },
    { breakfast: '杂粮粥+水煮蛋+蒸饺', lunch: '香菇蒸鸡+麻婆豆腐(温和版)+米饭', dinner: '菠菜猪肝汤+清炒时蔬+杂粮饭', snack: '草莓+酸奶' },
    { breakfast: '红枣枸杞粥+全麦馒头+水煮蛋', lunch: '清蒸鲈鱼+蒜蓉西兰花+米饭', dinner: '胡萝卜炖牛肉+紫菜蛋花汤+杂粮饭', snack: '猕猴桃+核桃' },
    { breakfast: '牛奶燕麦+蒸南瓜+蓝莓', lunch: '瘦肉炒时蔬+番茄炒蛋+米饭', dinner: '鸡汤面+青菜+荷包蛋', snack: '酸奶+坚果' },
  ],
};
