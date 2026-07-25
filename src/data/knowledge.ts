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
  babyLength: string;
  development: string;
  motherChanges: string;
  tips: string;
  nutrition: string;
  checkup: string;
  warning: string;
}

export const pregnancyWeeks: PregnancyWeek[] = [
  { week: 4, trimester: 1, babySize: '罂粟籽', babyWeight: '<1g', babyLength: '约0.2mm', development: '受精卵着床完成，羊膜腔和胎盘开始形成。胚胎由外胚层、中胚层和内胚层三层细胞构成，将分别发育成神经系统/皮肤、骨骼/肌肉/心脏、内脏器官。神经管（未来大脑和脊髓）开始发育。', motherChanges: '停经是最早的信号。部分女性可能感到轻微腹部抽痛（着床痛）或少量点滴出血（着床出血）。基础体温持续升高。乳房可能开始胀痛。', tips: '立即开始每天服用叶酸400-600μg预防神经管缺陷。停止吸烟饮酒。避免高温环境如桑拿、热水浴（体温过高影响胚胎发育）。', nutrition: '叶酸是本周最关键营养素。从深绿色叶菜、豆类、柑橘、全谷物获取。如果尚未补充孕期复合维生素，现在就该开始。', checkup: '如已确认怀孕，预约第一次产检（通常在第6-8周）。确认是否含有孕期禁忌药物。', warning: '停经但验孕阴性、严重腹痛或大量出血需立即就医排除宫外孕。' },
  { week: 5, trimester: 1, babySize: '芝麻粒', babyWeight: '<1g', babyLength: '约1-2mm', development: '胚胎呈C形，心脏开始形成并可能开始跳动（经阴道B超可见）。神经管继续发育。脐带雏形出现。', motherChanges: '早孕反应开始：恶心（晨吐）、疲劳、乳房触痛、对气味敏感。尿频出现（子宫增大压迫膀胱）。情绪波动。', tips: '少食多餐，床边放饼干晨起前吃几口。避免空腹。多休息。避免猫砂（弓形虫风险）。', nutrition: '继续叶酸。增加维生素B6摄入（香蕉、牛油果、鸡胸肉）可缓解孕吐。每日饮水量至少1.5-2L。', checkup: '预约首次产检。', warning: '剧烈腹痛伴阴道出血警惕宫外孕或流产。持续喷射性呕吐需就医排除妊娠剧吐。' },
  { week: 6, trimester: 1, babySize: '扁豆', babyWeight: '<1g', babyLength: '约4-6mm', development: '心脏已经有规律跳动（每分钟约100-130次）可通过阴道B超看到。头部开始形成，眼点（未来眼睛）和肢芽（未来四肢）出现。消化道开始发育。', motherChanges: '早孕反应可能加重。乳房增大，乳晕颜色变深。极度疲劳。可能开始出现便秘。', tips: '如果晨吐严重影响进食，尝试冷食（气味较轻），姜片嚼服或姜茶有助缓解。可以开始了解孕期运动安全指南。', nutrition: '确保蛋白质摄入（每日至少60g），即使胃口不好也要努力吃。少量多餐是关键。', checkup: '本周可能做第一次B超看心跳。', warning: '出血量超过月经量需立即就医。持续呕吐导致无法进食进水超过12小时。' },
  { week: 7, trimester: 1, babySize: '蓝莓', babyWeight: '<1g', babyLength: '约10-13mm', development: '大脑快速发育，面部特征开始形成（嘴、鼻孔、耳朵凹陷）。手臂和腿部开始变长。脐带更加明显。肾脏和肝脏开始发育。', motherChanges: '晨吐高峰期。唾液分泌增多。部分孕妇可能出现轻度头痛。体重可能因食欲下降略有减少。', tips: '避免任何药物（包括中草药）除非医生明确许可。使用孕妇安全护肤品。开始做凯格尔运动为分娩做准备。', nutrition: '维生素B6和姜可帮助缓解恶心。高纤维食物预防便秘。补充碘（碘盐、海带）支持胎儿甲状腺发育。', checkup: '本周或下周第一次正式产检建档。', warning: '严重头痛伴视力模糊需警惕。发烧超过38度需就医。' },
  { week: 8, trimester: 1, babySize: '覆盆子', babyWeight: '约1g', babyLength: '约16mm', development: '所有主要器官已开始发育（心脏、大脑、肺、肝脏、肾脏）。手指和脚趾开始分离但仍有蹼相连。眼睛有色素沉着。外耳开始形成。尾巴逐渐消失。', motherChanges: '子宫增大至橙子大小。早孕反应持续。乳房继续增大。可能出现轻度骨盆疼痛（子宫韧带拉伸）。', tips: '第一次正式产检通常在8-10周，做好相关准备。可以开始了解孕期体重管理目标（BMI正常者全程增重11.5-16kg）。', nutrition: '碘摄入220μg/天。锌11mg/天支持细胞分裂。早孕期整体热量不需额外增加，但要保证营养密度。', checkup: '建立孕期档案，完成基础体检和血常规、血型、病毒筛查等检查。', warning: '严重腹痛需排除宫外孕（宫外孕在8-10周最易出现症状）。' },
  { week: 9, trimester: 1, babySize: '樱桃', babyWeight: '约2g', babyLength: '约23mm', development: '胚胎期结束，正式进入胎儿期。头部占身体一半。所有主要关节（肘、膝、肩、腕、踝）开始形成。眼皮形成但融合关闭。手指脚趾完全分离。', motherChanges: '子宫增大至葡萄柚大小。早孕反应持续。可能感觉头晕（低血压常见）。阴道分泌物增多（正常现象，淡白无味）。', tips: '避免提重物。起床时先侧卧片刻再慢慢起身防止头晕。如果阴道分泌物有异味或颜色异常要警惕感染。', nutrition: '钙1000mg/天开始重要（牛奶、酸奶、芝士、豆腐）。维生素B12对神经发育关键。', checkup: '根据医生安排进行。', warning: '阴道出血无论量多少都应告知医生。分泌物发黄/绿色或带臭味需检查。' },
  { week: 10, trimester: 1, babySize: '草莓', babyWeight: '约4g', babyLength: '约31mm', development: '所有重要器官已基本形成。指甲开始生长。外生殖器开始发育但尚难分辨性别。面部轮廓更清晰。骨骼开始取代软骨。', motherChanges: '早孕反应可能开始减轻（因人而异）。情绪可能波动较大。可能开始有些许腹部隆起但还看不出来。', tips: '考虑报孕期课程。开始了解NIPT（无创产前筛查）和NT检查选项。给自己足够休息时间。', nutrition: 'DHA 200-300mg/天支持大脑发育（鱼油或藻油补充剂、三文鱼、沙丁鱼）。维生素D 600IU/天。', checkup: '了解NT检查和NIPT筛查，通常在11-13周进行。', warning: '严重焦虑或抑郁症状（持续两周以上）需寻求心理支持。' },
  { week: 11, trimester: 1, babySize: '无花果', babyWeight: '约7g', babyLength: '约41mm', development: '头部占身体约一半。肠道开始从脐带中移回腹腔。手可以握拳且能在羊水中活动。牙蕾在牙龈中形成。', motherChanges: '子宫上升进入腹腔，对膀胱压迫减轻（尿频改善）。早孕反应开始消退。食欲可能改善。', tips: '及早筛查（NT检查最佳时间11-13周）。开始了解孕期安全运动（散步、游泳、孕期瑜伽）。开始记录体重。', nutrition: '食欲恢复后注重均衡而非量。继续叶酸、铁、钙的摄入。', checkup: 'NT检查（11-13周）和首次血清筛查。', warning: '一旦发现任何异常出血立即就医。' },
  { week: 12, trimester: 1, babySize: '李子', babyWeight: '约14g', babyLength: '约54mm', development: '外部生殖器开始分化（可辨性别但B超尚不准确）。手指脚趾完全分开且有指甲。所有器官已形成且开始运作。肾脏开始产生尿液排入羊水。肝脏开始分泌胆汁。', motherChanges: '第一孕期即将结束，晨吐明显减轻。子宫升至腹腔，腹部开始轻微隆起（自己可能注意到）。精力改善。', tips: '完成NT检查。如有条件可考虑NIPT更准确筛查染色体异常。继续适度运动。开始思考分娩计划。', nutrition: '进入第二孕期后每日可额外摄入300大卡。继续保证叶酸、铁、钙、DHA。', checkup: 'NT检查截止周，NIPT从本周起可做。', warning: 'NT值异常需进一步诊断（绒毛穿刺或羊水穿刺）。' },
  { week: 13, trimester: 2, babySize: '柠檬', babyWeight: '约23g', babyLength: '约74mm', development: '进入第二孕期。身体比例改善，头部不再是身体一半。指纹正在形成。胎儿开始练习吞咽、呼吸动作（吸入羊水呼出）。骨骼继续骨化。', motherChanges: '进入"蜜月期"——恶心减轻、精力回升。腹部开始明显隆起。乳房继续增大。可能出现初乳。', tips: '第二孕期是最舒适的阶段，可规划旅行（孕中期飞行较安全）。开始购买宽松舒适的孕妇装。', nutrition: '每日额外300大卡。增加优质蛋白摄入。钙1000mg/天非常重要——胎儿骨骼快速发育期。', checkup: '常规产检。可预约16-20周的唐筛（血清学筛查）。', warning: '如果恶心没有明显改善或突然再次出现，告知医生。' },
  { week: 14, trimester: 2, babySize: '杏子', babyWeight: '约43g', babyLength: '约87mm', development: '肝脏和脾脏开始制造红细胞（之前由卵黄囊负责）。甲状腺成熟并开始分泌激素。胎儿能做出皱眉、眯眼、做鬼脸的表情。', motherChanges: '精力持续改善。腹部更加明显。可能出现"妊娠线"（从肚脐到耻骨的深色线）。乳房继续增大准备泌乳。', tips: '开始使用孕妇专用护肤品防止妊娠纹。定期做凯格尔运动。可以开始听孕期音乐和胎教。', nutrition: '继续保障铁摄入27mg/天预防孕期贫血。富铁食物包括红肉、动物肝脏（少量）、菠菜。', checkup: '常规产检。', warning: '突然大量阴道排液需排除羊水破裂。' },
  { week: 15, trimester: 2, babySize: '苹果', babyWeight: '约70g', babyLength: '约101mm', development: '骨骼继续硬化。皮肤很薄透明可见血管。头皮上开始长头发（胎毛——lanugo）。胎儿能够活动关节。听力开始发展但尚不能听到外界声音。', motherChanges: '体重应明显开始增加（每周约增0.5kg）。可能出现鼻塞和鼻出血（血容量增加导致）。可能出现牙龈出血。', tips: '使用加湿器缓解鼻塞。用软毛牙刷。如果牙龈持续出血看牙医（孕期牙龈炎常见）。', nutrition: '维生素C 85mg/天增强铁吸收。优质蛋白持续保障。', checkup: '常规产检。可做血清学唐筛（15-20周）。', warning: '持续鼻出血需要评估。严重牙龈炎需治疗以免影响胎儿。' },
  { week: 16, trimester: 2, babySize: '牛油果', babyWeight: '约100g', babyLength: '约116mm', development: '胎动可能被初产妇感受到（像蝴蝶振翅）。胎儿可以吸吮、吞咽。面部表情更丰富。泌尿系统功能正常。头部抬起。手脚发育完整。', motherChanges: '可能首次感觉到胎动（经产妇更早）。腹部明显隆起。可能出现轻度背痛（姿势改变）。', tips: '宝宝从16周开始能通过羊水尝到妈妈食物的味道——饮食多样化有助于宝宝未来更容易接受各种食物。考虑记录胎动。', nutrition: '开始有意识摄入Omega-3（DHA）支持宝宝大脑发育。每周2-3次低汞深海鱼（三文鱼、沙丁鱼）。', checkup: '如未做唐筛尽快安排。常规产检测量宫高和胎心。', warning: '如果16周后仍未感觉到胎动不必过度焦虑（初产妇可能到20周才明显感觉），但应告知医生。' },
  { week: 17, trimester: 2, babySize: '梨', babyWeight: '约140g', babyLength: '约130mm', development: '脂肪开始在皮下储存（棕色脂肪帮助出生后保温）。反射动作更加协调。胎儿打嗝（横膈膜练习）。循环系统和泌尿系统功能完善。', motherChanges: '子宫继续增大上移。可能感觉骨盆韧带松弛（松弛素分泌增加）。可能出现轻度腿部抽筋（尤其夜间）。', tips: '睡前做小腿拉伸可预防抽筋。如果抽筋发生脚尖向膝盖方向翘。不要突然站立或转身。', nutrition: '补充镁（坚果、深绿色叶菜、香蕉）和钾（牛油果、香蕉、红薯）可减少抽筋。', checkup: '常规产检。', warning: '持续单侧腿肿痛需排除深静脉血栓。' },
  { week: 18, trimester: 2, babySize: '红薯', babyWeight: '约190g', babyLength: '约142mm', development: '生殖系统继续发育，B超可较准确判断性别。胎动更频繁有力。耳朵已发育到最终位置，开始能听到外界声音（听到妈妈的心跳、消化声和说话声）。', motherChanges: '食欲明显增加。可能开始感觉烧心和消化不良（子宫压迫胃）。胎动更明显。可能出现轻度水肿（尤其下午）。', tips: '开始和宝宝说话、放音乐。少食多餐减少烧心。饭后不要立即躺下。', nutrition: '避免辛辣油腻食物缓解烧心。保持液体摄入但少喝碳酸饮料。', checkup: '大排畸B超通常安排在20-24周，本周可预约。', warning: '突然大量进展的水肿需警惕子痫前期。' },
  { week: 19, trimester: 2, babySize: '芒果', babyWeight: '约240g', babyLength: '约153mm', development: '大脑专门区域开始分化（触觉、味觉、嗅觉、视觉、听觉区域）。胎脂（vernix）开始在皮肤上形成保护层。胎动更有规律。', motherChanges: '肚子形状更明显。可能出现妊娠斑（黄褐斑）——脸颊、额头、脖颈的色素沉着。部分孕妇出现"黑线"加深。', tips: '严格防晒——孕期皮肤对紫外线更敏感且色素沉着更易发生。使用宽檐帽和物理防晒霜。', nutrition: '维生素A 770μg/天但不要过量（过量可致畸）。来源：胡萝卜、红薯、南瓜、菠菜。', checkup: '常规产检。', warning: '腹痛伴背部疼痛需警惕。突然手掌脚掌瘙痒需查胆汁淤积。' },
  { week: 20, trimester: 2, babySize: '香蕉', babyWeight: '约300g', babyLength: '约165mm', development: '孕期中点！胎儿已形成规律的睡眠和活动周期。能够听到并回应外界声音（如突然声响可能跳动）。皮肤开始增厚但仍能看到血管。吞咽动作更协调。', motherChanges: '子宫到达肚脐高度。胎动明显有力。可能出现轻微的Braxton Hicks（假性宫缩）——不规律、不疼。腰痛可能增加。', tips: '大排畸B超（20-24周）——检查胎儿结构、胎盘位置、羊水量。一次非常重要的B超。开始关注胎位。', nutrition: '继续保持均衡营养。钙需求1000mg/天高峰。铁27mg/天预防贫血。', checkup: '完成大排畸B超和常规产检。', warning: '假性宫缩如变规律或疼痛需就医。大排畸发现任何异常与医生充分沟通。' },
  { week: 21, trimester: 2, babySize: '胡萝卜', babyWeight: '约360g', babyLength: '约267mm', development: '骨骼继续强化。骨髓开始制造红细胞。肠道开始产生胎便（meconium——出生后第一次大便）。胎儿品尝能力更强——能通过羊水尝到妈妈吃了什么。', motherChanges: '体重增加每周约0.5kg。可能开始出现静脉曲张（腿部蓝色扭曲血管）。脚可能开始变大。', tips: '避免久站和久坐。休息时抬高双腿。穿宽松舒适的平底鞋。孕妇托腹带可以缓解腰部压力。', nutrition: '继续多样化饮食让宝宝接触不同味道。控制盐分摄入但不要无盐。', checkup: '常规产检。', warning: '静脉曲张处如果红肿热痛需警惕血栓静脉炎。' },
  { week: 22, trimester: 2, babySize: '小南瓜', babyWeight: '约430g', babyLength: '约278mm', development: '胎儿看起来像一个缩小版新生儿（但皮肤皱、红因为缺少皮下脂肪）。味蕾发育完成。触觉发育——如果手掌碰触到什么东西会握紧。眉毛和睫毛出现。', motherChanges: '肚子继续增大。可能感觉皮肤紧绷发痒。部分孕妇出现耻骨联合疼痛。睡眠可能变差（找不到舒适姿势）。', tips: '左侧卧有助于增加子宫血流。用孕妇枕支撑腹部和背部。温和的身体乳可以缓解皮肤瘙痒。', nutrition: '继续Omega-3摄入。纤维摄入预防便秘（孕期常见问题因为孕激素减慢肠道蠕动）。', checkup: '常规产检。', warning: '全身剧烈瘙痒尤其手心脚心需急查肝功能排除胆汁淤积。' },
  { week: 23, trimester: 2, babySize: '大芒果', babyWeight: '约500g', babyLength: '约289mm', development: '胎儿进入"存活边缘"（23周后如有早产理论上可在NICU存活但风险极高）。肺部继续发育肺泡和表面活性物质。胰腺发育。听力更敏锐。', motherChanges: '子宫超过肚脐2-4cm。体重增加约5-7kg（因人而异）。Braxton Hicks宫缩可能更频繁。手可能感觉麻木（腕管综合征常见）。', tips: '如有手麻夜间戴手腕夹板有效。继续关注胎动（虽然没有固定规律但应可感知活动）。', nutrition: '充分补水。铁需求高峰期——缺铁性贫血在23-28周常见。', checkup: '常规产检。医生可能建议做糖耐量筛查。', warning: '胎动突然明显减少或停止需立即就医。' },
  { week: 24, trimester: 2, babySize: '玉米', babyWeight: '约600g', babyLength: '约300mm', development: '肺部开始产生表面活性物质（出生后保持肺泡张开的关键物质）。大脑快速发育期。内耳（平衡感）完全发育——胎儿能感觉到自己在羊水中翻跟头。皮肤仍透明但开始增厚。', motherChanges: '子宫在肚脐上约3-5cm。体重继续稳定增加。可能出现轻度水肿（脚踝和手指）。可能开始失眠。', tips: '完成糖耐量检查（OGTT）——24-28周必做的妊娠糖尿病筛查。检查前一晚正常饮食不要刻意节食。', nutrition: '控糖从现在开始重要——选择低GI食物（全麦、糙米、豆类）替代精制碳水化合物。', checkup: '糖耐量（24-28周）、常规产检。', warning: '糖耐量异常需认真控糖——妊娠糖尿病如不加管理可导致巨大儿和新生儿低血糖。' },
  { week: 25, trimester: 2, babySize: '西葫芦', babyWeight: '约660g', babyLength: '约346mm', development: '胎儿开始增加皮下脂肪——皮肤从透明转向不透明。毛细血管在皮肤下形成。鼻孔开始张开。肺部继续发育。胎儿握力增强。', motherChanges: '第三孕期即将开始。腹部继续增大。可能感觉呼吸有些困难（子宫压迫横膈膜）。', tips: '开始了解分娩和母乳喂养知识。可以开始准备待产包的基本物品。放慢节奏，注意休息。', nutrition: '继续注意均衡营养。铁的摄入至关紧要——缺铁会加重疲劳。', checkup: '如糖耐量尚未完成尽快安排。', warning: '持续呼吸急促需告知医生排除贫血或心脏问题。' },
  { week: 26, trimester: 2, babySize: '茄子', babyWeight: '约760g', babyLength: '约356mm', development: '眼睛开始睁开（之前眼皮一直融合关闭）并能感知光线。视网膜发育。肺部分泌表面活性物质能力增强。脑波活动类似于新生儿。', motherChanges: '第二孕期即将结束。可能感觉胎动更加明显（宝宝在有限空间里活动）。睡眠困难增加。', tips: '用手电筒照腹部可以看到宝宝回应（不刺眼的柔光）。正式学习分娩呼吸法。与伴侣讨论分娩计划。', nutrition: '胆碱450mg/天有助于大脑发育。蛋黄是胆碱最佳来源。', checkup: '常规产检。注意胎动计数。', warning: '如果发现阴道出血，任何量都告知医生（可能胎盘前置）。' },
  { week: 27, trimester: 2, babySize: '花椰菜', babyWeight: '约875g', babyLength: '约366mm', development: '第二孕期最后一周。大脑快速发育——大脑皮层开始折叠形成沟回。肺部和免疫系统继续成熟。胎儿有自己的睡眠周期和可能做梦的REM睡眠。', motherChanges: '可能开始感觉更疲劳（体重增加和睡眠差）。腿抽筋可能更频繁。痔疮可能出现。', tips: '数胎动——从28周开始每天固定时间数2小时应有10次以上胎动。提前观看分娩视频了解产程。', nutrition: '继续高纤维饮食预防便秘和痔疮。充分补水。', checkup: '从下周开始产检变为每2周一次。', warning: '胎动模式突然改变需重视。' },
  { week: 28, trimester: 3, babySize: '大茄子', babyWeight: '约1000g', babyLength: '约376mm', development: '进入第三孕期！胎儿重约1kg。能睁开眼睛并转动眼球。中枢神经系统能指挥节奏呼吸和控制体温。肺部已有能力进行气体交换（虽仍需要表面活性物质支持）。', motherChanges: '开始数胎动（每天固定时间应感知10次以上/2小时）。Braxton Hicks宫缩更频繁且更明显。可能感觉气喘和呼吸短促。体重增加加速。', tips: '第三孕期开始每日数胎动——选择宝宝最活跃的时间段。开始正式准备待产包。了解早产迹象。', nutrition: '每日额外300大卡仍适用但选择优质热量。DHA和胆碱对第三孕期大脑发育关键。', checkup: '产检频率增加到每2周。部分医院会在28周打百白破疫苗。', warning: '胎动明显减少（<10次/2小时）立即就医。规律宫缩（每10分钟以上）或流液需警惕早产。' },
  { week: 29, trimester: 3, babySize: '冬南瓜', babyWeight: '约1150g', babyLength: '约386mm', development: '大脑继续快速发育——神经元连接激增。骨骼强化需要大量钙质（优先从母体骨骼获取如钙摄入不足）。肌肉和肺部继续成熟。', motherChanges: '体重增加加速（每周约0.5kg）。烧心和消化不良常见。腿部抽筋可能更频繁。可能开始漏初乳。', tips: '使用哺乳垫防漏奶。如果烧心严重咨询医生安全用药。继续凯格尔运动。', nutrition: '钙摄入至关重要！胎儿骨骼发育需要大量钙——摄入不足时会从母亲骨骼中抽调。', checkup: '常规产检。', warning: '突然严重的耻骨或骨盆疼痛需检查（耻骨联合分离）。' },
  { week: 30, trimester: 3, babySize: '大白菜', babyWeight: '约1300g', babyLength: '约400mm', development: '胎儿已经有明显醒睡周期。眼睛能感知光亮并通过腹壁看到模糊的光。骨髓已经完全接替肝脏负责红细胞生成。胎毛开始脱落。', motherChanges: '子宫压迫导致呼吸短促、尿频、消化不良。可能出现"怀孕大脑"——记忆力下降和注意力不集中（正常现象，与激素和疲劳有关）。', tips: '如果孕晚期还要工作，考虑周数开始安排产假。准备大量笔记和提醒帮助自己。不能长时间仰卧（压迫大血管减少回心血量）。', nutrition: '继续均衡饮食。如有水肿不要完全停盐（孕期仍需钠）但控制不过量。', checkup: '常规产检。', warning: '突然头痛伴视力模糊、上腹痛提示子痫前期需紧急就医。' },
  { week: 31, trimester: 3, babySize: '椰子', babyWeight: '约1500g', babyLength: '约411mm', development: '胎儿继续增重和长胖。中枢神经系统能控制体温。如果此时早产宝宝有很大几率存活但需要NICU支持。', motherChanges: '腹部继续增大。睡眠质量可能差——难以找到舒适姿势。走几步路就气喘。可能出现轻度焦虑关于分娩。', tips: '如果还未参加分娩课程，尽快报名。打包好待产包。确认入院路线和时间。练习呼吸和放松技巧。', nutrition: '继续关注铁和钙。第三孕期DHA尤其关键。', checkup: '常规产检每2周。', warning: '有明显规律的宫缩（早产）需立即就医。' },
  { week: 32, trimester: 3, babySize: '南瓜', babyWeight: '约1700g', babyLength: '约424mm', development: '胎儿重约1.7kg，体长约42cm。大部分胎儿此时已经转为头位（头朝下）。脚趾甲完全长出。胎毛大量脱落。皮肤变的不那么皱。', motherChanges: '子宫底到达胸骨下方。频繁排尿——宝宝头部压迫膀胱。双腿容易疲劳和水肿。可能出现呼吸短促。', tips: '确认胎位——如果臀位咨询医生膝胸卧位矫正法。合理安排作息。', nutrition: '每日补充水分至少2升。', checkup: 'B超评估胎位、胎盘、羊水量。', warning: '如果32周后宝宝仍然是臀位需要与医生讨论外倒转术或剖腹产选项。' },
  { week: 33, trimester: 3, babySize: '菠萝', babyWeight: '约1900g', babyLength: '约435mm', development: '宝宝快速增重——每周约增200-250g。身体比例接近足月。颅骨仍未闭合——保持柔韧以便分娩时通过产道。免疫系统继续发育从母体获取抗体。', motherChanges: '可能感觉胎动减少一点（空间变小了但胎动强度应仍然存在且有力）。走路姿势改变（骨盆韧带松弛导致"鸭子步"）。', tips: '继续数胎动。开始阅读新生儿护理书籍。如果打算母乳喂养可以参加哺乳课程。', nutrition: '继续均衡营养。孕晚期每日一块黑巧克力可能有助于宝宝睡眠（含Omega-3）。', checkup: '常规产检。', warning: '胎动明显减少（<10次/2小时）立即就医绝不可等。' },
  { week: 34, trimester: 3, babySize: '哈密瓜', babyWeight: '约2100g', babyLength: '约450mm', development: '肺部接近成熟但仍在发育。中枢神经系统继续完善。免疫系统发育——宝宝通过胎盘从母体获取抗体。皮肤更粉更光滑。', motherChanges: '可能感觉更疲劳。胎动可能感觉不同——宝宝转身少但滚动和踢蹬多。水肿可能加重（尤其下午）。', tips: '休息时尽量左侧卧。如果水肿严重抬高脚。继续准备待产包。确认产后支持系统（家人/月嫂/月子中心）。', nutrition: '补水继续。如果贫血未纠正遵医嘱服用铁剂。', checkup: '常规产检。本周可能做B超评估胎儿大小和胎位。', warning: '大量水肿伴高血压或蛋白尿需警惕子痫前期。' },
  { week: 35, trimester: 3, babySize: '蜜瓜', babyWeight: '约2400g', babyLength: '约462mm', development: '肾脏发育完全。肝脏开始产生一些代谢物。大部分发育完成——现在主要是增重和脂肪存储。如果此时出生大部分宝宝能独立呼吸但仍需保暖。', motherChanges: '子宫底达到最高点。呼吸困难到达顶峰（横膈膜被高高顶起）。走路慢且可能腰痛严重。', tips: '完成待产包和入院准备。如选择水中分娩或家庭分娩确认最终安排。', nutrition: '少食多餐缓解胃部压迫。', checkup: '产检频率增加到每周一次。', warning: '如果感觉宝宝"掉下来了"——可能是入盆（正常）也可能破水（需就医）。' },
  { week: 36, trimester: 3, babySize: '生菜', babyWeight: '约2600g', babyLength: '约474mm', development: '宝宝的循环系统和骨骼肌肉系统协调良好。如果本周出生属于"晚期早产"但通常健康良好。胎毛几乎消失。', motherChanges: '首次妊娠的孕妇宝宝可能本周开始入盆（头朝下进入骨盆）——腹部看起来"下降"但呼吸突然变轻松。经产妇可能要到分娩前才入盆。', tips: '确定胎位且排除胎盘前置后可以开始会阴按摩。整理所有产检资料放入待产包。', nutrition: '继续均衡饮食——不要因为临产在即放松营养。', checkup: '每周产检。B族链球菌（GBS）筛查——36-37周。', warning: 'GBS阳性需要分娩时使用抗生素预防宝宝感染。' },
  { week: 37, trimester: 3, babySize: '小冬瓜', babyWeight: '约2900g', babyLength: '约484mm', development: '宝宝已足月！（37周后出生即为足月儿）。肺部完全成熟准备独立呼吸。反射动作准备好出生后使用（吸吮、抓握、觅食）。', motherChanges: '假性宫缩更频繁可能不舒服。宫颈开始软化和可能开始扩张。可能有"见红"（带血丝的黏液）。', tips: '宝宝随时可能出生——确认手机有电、加油箱、确认路线。如有见红或黏液栓脱落正常（但不必立即去医院除非规律宫缩或破水）。', nutrition: '正常饮食。分娩前可以吃一些易消化的碳水化合物补充体力。', checkup: '每周产检——医生可能内检评估宫颈。', warning: '规律宫缩、破水、大量出血需立即前往医院。' },
  { week: 38, trimester: 3, babySize: '小南瓜', babyWeight: '约3100g', babyLength: '约494mm', development: '宝宝继续增重和积累脂肪。器官全部成熟。头围和腹围大致相等（利于通过产道）。', motherChanges: '可能感觉极度不舒服——腹部巨大、行动困难、睡眠极差。混合着兴奋和焦虑的情绪。', tips: '保持镇定。宝宝会在准备好的时候出来。可以尝试温和的催产方法（爬楼梯、散步、刺激乳头）但需咨询医生。', nutrition: '正常饮食。分娩可能持续很久——准备一些高能量零食带入产房。', checkup: '每周产检。', warning: '羊水减少——如感觉漏液持续需检查是否为破水。' },
  { week: 39, trimester: 3, babySize: '迷你南瓜', babyWeight: '约3300g', babyLength: '约503mm', development: '发育完全。颅骨柔韧可重叠便于通过产道——出生后几天恢复圆润形状。外生殖器可能因母体激素有些肿胀（正常，出生后消退）。', motherChanges: '情绪可能焦虑——"为什么还没发动？"完全正常。39周尚未发动很常见（尤其初产妇）。', tips: '最后检查待产包。不要单独出门。确认产后回家安排（婴儿座椅安装好）。', nutrition: '正常饮食。多休息保存体力。', checkup: '每周产检。', warning: '超过41周医生会建议引产（胎盘功能开始下降）。任何产兆——规律宫缩、破水、见红增多——准备出发。' },
  { week: 40, trimester: 3, babySize: '小南瓜', babyWeight: '约3400g', babyLength: '约508mm', development: '发育完全准备出生。宝宝已具备所有生存技能。注意胎动——孕晚期胎动减少可能是胎盘功能下降的信号。', motherChanges: '如超过预产期正常。只有约5%宝宝恰好在预产期出生。可能感觉更不舒服和更焦虑。', tips: '如果超过40周但未破水和规律宫缩——继续数胎动、正常活动、等待。与医生讨论42周前的引产计划。', nutrition: '保存体力。分娩像马拉松——需要能量和水分。', checkup: '超预产期产检包括胎心监护和B超评估羊水量和胎盘功能。', warning: '超过41周医生会建议引产。任何胎动急剧减少、破水、规律宫缩需立即就医。' },
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


// ======== 年龄对应教育建议 (综合正面管教+蒙台梭利+看见孩子) ========

export interface AgeEducation {
  ageRange: string;
  ageLabel: string;
  activities: string[];
  parentingTips: string[];
  milestones: string[];
  warningFlags: string[];
}

export const ageEducation: AgeEducation[] = [
  {
    ageRange: '0-1', ageLabel: '0-1个月',
    activities: ['黑白卡追视(距离20-30cm)', '轻柔抚触按摩全身', '轻声呼唤宝宝名字', '面对面做夸张表情'],
    parentingTips: ['回应宝宝所有哭声——这个阶段哭就是沟通', '抱宝宝不限量——建立安全感', '多和宝宝进行皮肤接触(袋鼠式护理)', '观察宝宝的清醒窗口期(通常很短，约45-60分钟)'],
    milestones: ['俯卧时能短暂抬头', '注视人脸', '对声音有反应', '能分辨妈妈的气味和声音'],
    warningFlags: ['对响亮声音无反应', '不注视人脸', '身体过于松软或僵硬', '吸吮困难'],
  },
  {
    ageRange: '1-2', ageLabel: '1-2个月',
    activities: ['继续黑白卡+引入有图案的书', '摇铃训练听觉追踪', '俯卧练习每天数次每次1-2分钟', '轻轻按摩手指和脚趾'],
    parentingTips: ['建立简单睡前程序(洗澡-按摩-喂奶-安静-放下)', '注意宝宝的疲倦信号(揉眼、烦躁、目光呆滞)', '开始区分白天黑夜——白天保持明亮活跃，晚上保持安静昏暗'],
    milestones: ['俯卧时抬头45度', '社交性微笑', '发出咕咕声', '眼睛追随物体过中线'],
    warningFlags: ['2个月时仍不会对人笑', '不会追视移动物体', '俯卧时完全不能抬头'],
  },
  {
    ageRange: '2-3', ageLabel: '2-3个月',
    activities: ['彩色悬吊玩具刺激视觉', '不同材质布料触摸体验', '面对面"对话"模仿宝宝的声音', '轻柔音乐和唱歌'],
    parentingTips: ['注意E.A.S.Y.常规的建立——进食-活动-睡眠-你的时间', '不要过度刺激——观察宝宝需要安静的时候', '相信你的本能——你是宝宝的专家'],
    milestones: ['俯卧时抬头90度', '笑出声', '发现自己的手', '能握住摇铃'],
    warningFlags: ['3个月时仍不能抬头', '不会笑', '手仍然紧握不张开'],
  },
  {
    ageRange: '3-6', ageLabel: '3-6个月',
    activities: ['彩色球滚动追视', '趴着玩耍(趴玩-非常重要!)', '抓握不同材质玩具(布书、硅胶牙胶、木环)', '躲猫猫游戏'],
    parentingTips: ['使用4S程序助眠:设定环境-裹襁褓-坐着-嘘拍', '开始阅读简单的绘本给宝宝看', '建立固定的睡前程序', '观察宝宝的独特气质类型'],
    milestones: ['翻身(4-5个月)', '伸手抓物', '咿呀学语', '认识熟悉的人'],
    warningFlags: ['4个月时头仍不稳', '不会伸手抓物', '对周围环境无兴趣', '身体非常僵硬'],
  },
  {
    ageRange: '6-9', ageLabel: '6-9个月',
    activities: ['感官篮探索(不同质感物品)', '敲打不同器皿探索声音', '躲猫猫(物体恒存概念)', '坐立玩耍'],
    parentingTips: ['开始引入辅食(6个月左右)——单一食材引入，观察过敏', '分离焦虑开始出现——每次离开时告知宝宝并道别', '使用抱起-放下法管理睡眠', '尊重宝宝的进食信号——不强迫进食'],
    milestones: ['独坐', '匍匐爬行', '发出辅音(ba/da/ma)', '认生'],
    warningFlags: ['7个月仍不能独坐', '不会翻身', '不会笑或发出声音', '对照顾者无反应'],
  },
  {
    ageRange: '9-12', ageLabel: '9-12个月',
    activities: ['投放游戏(小球放入盒子)', '扶着站立和蹲下', '拍手和挥手游戏', '简单模仿游戏'],
    parentingTips: ['使用简单清晰的语言和界限', '宝宝探索时要确保环境安全而非一味说"不"', '手指食物促进自主进食', '这是宝宝发展独立性的开始——尊重他的节奏'],
    milestones: ['扶站和扶走', '拇指食指捏取(钳形抓握)', '理解简单指令(如"不可以")', '有意识叫爸妈'],
    warningFlags: ['10个月仍不会爬', '不会用拇指食指捏东西', '不会发出辅音', '对名字无反应'],
  },
  {
    ageRange: '12-18', ageLabel: '12-18个月',
    activities: ['感官步道(不同材质垫子赤脚走)', '堆叠积木(2-3块)', '简单拼图(2-3片)', '倒水和装填游戏'],
    parentingTips: ['开始使用正面管教: 给两个可接受的选择', '自然后果法——让行为的结果自然发生', '鼓励而非表扬——"你很努力"而非"你真聪明"', '保持规律作息(1-2次午睡)'],
    milestones: ['独走', '用杯子喝水', '说3-5个词', '模仿简单家务'],
    warningFlags: ['18个月仍不会走', '不会指物分享兴趣', '不会说单个词', '不会模仿'],
  },
  {
    ageRange: '18-24', ageLabel: '18-24个月',
    activities: ['简单分类游戏(按颜色/形状)', '涂鸦和手指画', '玩沙子和水', '模仿家务(扫帚、抹布)'],
    parentingTips: ['看见孩子: 行为是一扇窗——"不良行为"背后是未满足的需求', '连接先于纠正——共情后再引导', '修复大于完美——亲子关系破裂后及时修复', '平静地设置边界——"我看到了你很沮丧，但我不会让你……"'],
    milestones: ['跑和踢球', '搭4-6块积木', '说20-50个词', '开始假扮游戏'],
    warningFlags: ['2岁仍不能说出有意义的词', '不会模仿动作', '不会使用日常物品(勺子)', '不会走或步态异常'],
  },
  {
    ageRange: '2-3', ageLabel: '2-3岁',
    activities: ['感官训练: 蒙台梭利日常生活练习(倒水/扫地/穿珠子)', '简单拼图(4-12片)', '角色扮演(过家家)', '攀爬和跑跳活动'],
    parentingTips: ['正面管教: 家庭会议(从3岁开始)', '积极的暂停——情绪激动时先冷静再解决问题', '不要进行"计时隔离"(time-out)——改用"连接角落"', '认可情绪但限制行为——"你生气了可以，但不可以打人"'],
    milestones: ['上楼梯交替脚', '画圆和直线', '说3词句子', '开始与同伴互动'],
    warningFlags: ['3岁仍经常跌倒', '不会说简单句子', '没有假扮游戏', '极端的分离焦虑'],
  },
];

export function getAgeEducation(months: number): AgeEducation | null {
  for (const edu of ageEducation) {
    const [min, max] = edu.ageRange.split('-').map(Number);
    if (months >= min && months < max) return edu;
  }
  return null;
}
