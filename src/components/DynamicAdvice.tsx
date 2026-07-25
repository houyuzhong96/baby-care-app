
import type { FeedRecord, SleepRecord, GrowthRecord } from '../data/knowledge';
import { getAgeEducation } from '../data/knowledge';
import { babySleepGuide, easyRoutines } from '../data/knowledge';

interface Props {
  profile: { name: string; birthDate: string; gender: string };
  feeds: FeedRecord[];
  sleeps: SleepRecord[];
  growths: GrowthRecord[];
}

export function generateAdvice({ profile, feeds, sleeps, growths }: Props): { type: 'tip' | 'warning' | 'info'; title: string; text: string }[] {
  const advice: { type: 'tip' | 'warning' | 'info'; title: string; text: string }[] = [];
  
  const birth = new Date(profile.birthDate);
  if (isNaN(birth.getTime())) {
    return [{ type: 'tip' as const, title: '完善宝宝信息', text: '请先设置宝宝的出生日期以获取个性化建议。' }];
  }
  const ageDays = Math.floor((Date.now() - birth.getTime()) / 86400000);
  const ageMonths = Math.floor(ageDays / 30.44);
  
  const today = new Date().toISOString().slice(0, 10);
  const todayFeeds = feeds.filter(f => f.time.startsWith(today));
  const todaySleeps = sleeps.filter(s => s.startTime.startsWith(today));
  
  // Age-specific advice
  const edu = getAgeEducation(ageMonths);
  if (edu) {
    advice.push({
      type: 'info',
      title: `${edu.ageLabel}发育提醒`,
      text: `宝宝现在${ageMonths}个月，这个阶段可以关注：${edu.milestones.slice(0, 2).join('、')}。适合的游戏：${edu.activities[0]}。`,
    });
  }
  
  // E.A.S.Y. routine based on age
  const easyRoutine = easyRoutines.find(r => {
    try {
      const parts = r.age.split('-');
      const parseAge = (s: string) => {
        const num = parseInt(s);
        if (isNaN(num)) return 0;
        if (s.includes('周')) return num / 4.3;
        if (s.includes('月')) return num;
        return num;
      };
      const min = parseAge(parts[0] || '0');
      const max = parseAge(parts[1] || '99');
      return ageMonths >= min && ageMonths <= max;
    } catch { return false; }
  });
  if (easyRoutine) {
    advice.push({
      type: 'tip',
      title: 'E.A.S.Y. 节奏参考',
      text: `当前阶段：E 进食 ${easyRoutine.eat} | A 活动 ${easyRoutine.activity} | S 睡眠 ${easyRoutine.sleep}。尽量按这个节奏安排宝宝的日常。`,
    });
  }
  
  // Sleep check
  const sleepGuide = babySleepGuide.find(s => {
    try {
      const parts = s.age.split('-');
      const parseAge = (x: string) => {
        const num = parseInt(x);
        if (isNaN(num)) return 0;
        if (x.includes('周')) return num / 4.3;
        if (x.includes('月')) return num;
        return num;
      };
      return ageMonths >= parseAge(parts[0] || '0') && ageMonths <= parseAge(parts[1] || '99');
    } catch { return false; }
  });
  
  if (sleepGuide) {
    const totalSleepToday = todaySleeps.reduce((sum, s) => {
      return sum + (new Date(s.endTime).getTime() - new Date(s.startTime).getTime()) / 3600000;
    }, 0);
    
    // Extract expected range from sleep guide
    const expectedMatch = sleepGuide.totalSleep.match(/(\d+)-(\d+)/);
    if (expectedMatch) {
      const minSleep = parseInt(expectedMatch[1]);
      if (totalSleepToday < minSleep && todaySleeps.length > 0) {
        advice.push({
          type: 'warning',
          title: '睡眠可能不足',
          text: `宝宝今天只睡了${Math.round(totalSleepToday)}小时，该月龄推荐${sleepGuide.totalSleep}小时。建议：${sleepGuide.tips.slice(0, 60)}...`,
        });
      }
    }
  }
  
  // Feeding check for newborns
  if (ageDays <= 90 && todayFeeds.length > 0) {
    if (ageDays <= 42 && todayFeeds.length < 8) {
      advice.push({
        type: 'warning',
        title: '喂养频率偏低',
        text: '新生儿(0-6周)每天应喂养8-12次（每2-3小时一次）。如果宝宝体重增长正常、每天6-8片湿尿布则不必太担心。',
      });
    }
  }
  
  // Growth data check
  if (growths.length >= 2) {
    const latest = growths[growths.length - 1];
    const previous = growths[growths.length - 2];
    advice.push({
      type: 'info',
      title: '生长趋势',
      text: `最新记录(${latest.date})：体重${latest.weight}kg，身长${latest.height}cm。与上次相比体重${(latest.weight - previous.weight > 0 ? '增加' : '减少')}${Math.abs(latest.weight - previous.weight).toFixed(2)}kg。`,
    });
  }
  
  // Sleep quality warning
  const poorSleeps = todaySleeps.filter(s => s.quality === 'poor');
  if (poorSleeps.length >= 2) {
    advice.push({
      type: 'warning',
      title: '睡眠质量关注',
      text: '今天有多次睡眠质量不佳。可能原因：过度疲劳、不适(胀气/出牙)、环境因素。观察宝宝的睡眠信号，在疲倦但未过度疲劳时安排入睡。',
    });
  }
  
  // General tips for newborns
  if (ageDays <= 30) {
    advice.push({
      type: 'tip',
      title: '新生儿护理要点',
      text: '按需喂养，每天8-12次；脐带脱落前保持干燥；注意黄疸（皮肤眼白发黄需关注）；维生素D 400IU/天。抱宝宝不限量建立安全感。',
    });
  }
  
  if (advice.length === 0) {
    advice.push({
      type: 'tip',
      title: '记录更多数据',
      text: '坚持记录喂养、睡眠和生长数据，系统会基于你的数据生成更针对性的建议。更多数据 = 更精准的建议。',
    });
  }
  
  return advice.slice(0, 5);
}

export function AdviceCard({ advice }: { advice: { type: string; title: string; text: string }[] }) {
  if (advice.length === 0) return null;
  
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">💡 智能建议</span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>基于你的记录生成</span>
      </div>
      {advice.map((a, i) => (
        <div key={i} style={{
          padding: '10px 0',
          borderBottom: i < advice.length - 1 ? '1px solid var(--border)' : 'none',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 18, marginTop: -1 }}>
            {a.type === 'warning' ? '⚠️' : a.type === 'tip' ? '💡' : '📋'}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{a.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
