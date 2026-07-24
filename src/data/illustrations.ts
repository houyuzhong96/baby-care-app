
// 插画配置 - 妻子画好后，替换 public/illustrations/ 下的文件即可
// 所有图片统一放在 public/illustrations/ 目录

export const illustrations = {
  // ====== 英雄区/主视觉 ======
  pregnancyHero: '/illustrations/pregnancy-hero.png',     // 孕期模式首页顶部
  babyHero: '/illustrations/baby-hero.png',               // 宝宝模式首页顶部
  babyProfileEmpty: '/illustrations/baby-profile.png',    // 添加宝宝信息引导
  
  // ====== 空状态 ======
  emptyRecords: '/illustrations/empty-records.png',       // 没有记录时展示
  emptyGrowth: '/illustrations/empty-growth.png',         // 生长曲线暂无数据
  
  // ====== 功能引导 ======
  feedingGuide: '/illustrations/feeding.png',             // 喂养记录入口
  sleepGuide: '/illustrations/sleeping-baby.png',         // 睡眠记录入口
  diaperGuide: '/illustrations/diaper.png',               // 尿布记录入口
  growthGuide: '/illustrations/growth-measure.png',       // 生长记录入口
  pregnancyGuide: '/illustrations/pregnant-woman.png',    // 孕期入口
  healthGuide: '/illustrations/doctor-baby.png',          // 健康入口
  developmentGuide: '/illustrations/play-learn.png',      // 发育入口
  knowledgeGuide: '/illustrations/reading-mom.png',       // 知识入口
  
  // ====== 孕期周历 ======
  babyFruit: (week: number) => `/illustrations/baby-week-${week}.png`, // 每周宝宝发展图
  
  // ====== 装饰 ======
  bgPattern: '/illustrations/bg-pattern.svg',             // 背景纹理
  bgCloud: '/illustrations/bg-cloud.svg',                 // 云朵装饰
  bgStar: '/illustrations/bg-star.svg',                   // 星星装饰
  
  // ====== 品牌 ======
  appLogo: '/illustrations/app-logo.png',                 // App 图标
  appMascot: '/illustrations/baby-mascot.png',            // 吉祥物/角色
};

// 简化使用：先用 emoji fallback，有图后会自动显示
export function getIllus(key: keyof typeof illustrations): string {
  return illustrations[key] as string;
}
