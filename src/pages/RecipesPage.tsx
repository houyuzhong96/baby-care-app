import { useState } from "react";

import { ChevronDown, ChevronUp, ChefHat, Baby } from "lucide-react";
import { dailyServings, trimesterMealTips, chineseRecipes, chineseWeeklyMealPlan } from "../data/recipes";
import { loadData } from "../data/store";

export default function RecipesPage() {
  const [tab, setTab] = useState(() => {
    const m = localStorage.getItem("app_mode") || "pregnancy";
    return m === "pregnancy" ? "chinese" : "solids";
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);
  
  const mode = localStorage.getItem("app_mode") || "pregnancy";
  const isPreg = mode === "pregnancy";
  
  // Get trimester for pregnancy recipes
  const pregWeek = parseInt(loadData("preg_week", "12"));
  const currentTri = pregWeek <= 12 ? "first" : pregWeek <= 27 ? "second" : "third";
  const triLabel = currentTri === "first" ? "孕早期" : currentTri === "second" ? "孕中期" : "孕晚期";
  
  // Baby age for solids
  const babyAgeMonths = (() => {
    const profile = loadData<any>("baby_profile", null);
    if (!profile?.birthDate) return 0;
    return Math.floor((Date.now() - new Date(profile.birthDate).getTime()) / (30.44 * 86400000));
  })();

  return (
    <div>
      {/* Mode-aware tabs */}
      <div className="tabs" style={{ flexWrap: "wrap", marginBottom: 16 }}>
        {isPreg ? (<>
          <button className={"tab" + (tab === "servings" ? " active" : "")} onClick={() => setTab("servings")}>份量指南</button>
          <button className={"tab" + (tab === "chinese" ? " active" : "")} onClick={() => setTab("chinese")}><ChefHat size={13} style={{ verticalAlign: "middle", marginRight: 3 }} />中式食谱</button>
          <button className={"tab" + (tab === "weekly" ? " active" : "")} onClick={() => setTab("weekly")}>每周食谱</button>
        </>) : (<>
          <button className={"tab" + (tab === "solids" ? " active" : "")} onClick={() => setTab("solids")}><Baby size={13} style={{ verticalAlign: "middle", marginRight: 3 }} />宝宝辅食</button>
          <button className={"tab" + (tab === "chinese" ? " active" : "")} onClick={() => setTab("chinese")}><ChefHat size={13} style={{ verticalAlign: "middle", marginRight: 3 }} />家庭食谱</button>
        </>)}
      </div>

      {/* === PREGNANCY: Servings === */}
      {tab === "servings" && (
        <div className="card">
          <div className="card-header"><span className="card-title">每日份量指南</span></div>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
            孕期每日可额外摄入300大卡。1份肉≈扑克牌大小，1份蔬果≈灯泡大小。
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "4px 6px" }}>类别</th><th style={{ padding: "4px 6px" }}>份数</th><th style={{ padding: "4px 6px" }}>举例</th>
              </tr></thead>
              <tbody>{dailyServings.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)", verticalAlign: "top" }}>
                  <td style={{ padding: "4px 6px", fontWeight: 500 }}>{s.category}</td>
                  <td style={{ padding: "4px 6px", color: "var(--accent)", fontWeight: 600 }}>{s.servings}</td>
                  <td style={{ padding: "4px 6px", fontSize: 11 }}>{s.examples}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* === PREGNANCY: Chinese recipes === */}
      {tab === "chinese" && (
        <div>
          {isPreg && <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 12 }}>
            当前{triLabel}（第{pregWeek}周）- 推荐以下菜谱
          </div>}
          {(isPreg 
            ? chineseRecipes.filter(r => r.trimester.includes(currentTri as any))
            : chineseRecipes
          ).map((r, i) => (
            <div className="card" key={i}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => toggle("r-" + i)} style={{ borderBottom: "none" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                    <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                      <span className="chip chip-info" style={{ fontSize: 10 }}>{r.category} · {r.mealType}</span>
                    </div>
                  </div>
                  {expanded === "r-" + i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expanded === "r-" + i && (
                  <div className="accordion-body">
                    <p><strong>食材：</strong>{r.ingredients}</p>
                    <p style={{ marginTop: 4 }}><strong>做法：</strong>{r.method}</p>
                    <p style={{ marginTop: 4, color: "var(--success)" }}><strong>营养：</strong>{r.nutrition}</p>
                    <p style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}>小贴士：{r.tips}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === PREGNANCY: Weekly plan === */}
      {tab === "weekly" && (
        <div>
          {Object.entries(trimesterMealTips).map(([key, t]: any) => (
            <div className="card" key={key}>
              <div className="card-header">
                <span className="card-title">{t.title}</span>
                <span className="chip chip-info">重点: {t.focus}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                {t.tips.map((tip: string, i: number) => <p key={i} style={{ padding: "3px 0" }}>• {tip}</p>)}
              </div>
            </div>
          ))}
          <div className="card">
            <div className="card-header"><span className="card-title">一周食谱</span></div>
            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
              {Object.keys(chineseWeeklyMealPlan).map(key => (
                <button key={key} className={"btn btn-sm " + (expanded === "w-" + key ? "btn-primary" : "btn-secondary")} onClick={() => toggle("w-" + key)}>
                  {key.replace("孕", "").replace("(", "").replace(")", "").replace("周", "周")}
                </button>
              ))}
            </div>
            {expanded && expanded.startsWith("w-") && chineseWeeklyMealPlan[expanded.replace("w-", "") as keyof typeof chineseWeeklyMealPlan]?.map((day, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>第{i + 1}天</div>
                {(["breakfast", "lunch", "dinner", "snack"] as const).map(meal => (
                  <div key={meal} style={{ fontSize: 12, color: "var(--text-secondary)", padding: "1px 0" }}>
                    {meal === "breakfast" ? "早餐" : meal === "lunch" ? "午餐" : meal === "dinner" ? "晚餐" : "加餐"}：{day[meal]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === BABY: Solids === */}
      {tab === "solids" && (
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title"><Baby size={18} /> 辅食添加指南</span></div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p><strong>添加时机：</strong>约6个月，具备信号：能坐稳、对食物有兴趣、舌推反射消失。</p>
              <p><strong>首选食物：</strong>高铁米粉 → 蔬菜泥 → 水果泥 → 肉泥</p>
              <p><strong>引入规则：</strong>单一食材，每次3-5天观察过敏。1岁前不吃蜂蜜、整颗坚果、盐糖。</p>
              <p><strong>分量演进：</strong>6-8月 1-2餐少量 → 8-10月 2-3餐+手指食物 → 10-12月 3餐+点心</p>
              {babyAgeMonths > 0 && <p style={{ marginTop: 8, color: "var(--accent)", fontWeight: 500 }}>宝宝当前{babyAgeMonths}个月 - {babyAgeMonths < 6 ? "还未到添加辅食的月龄，请继续纯母乳/配方奶喂养" : babyAgeMonths < 8 ? "处于辅食初期，从单一泥糊开始" : babyAgeMonths < 10 ? "可以尝试手指食物" : "逐渐过渡到三餐"}</p>}
            </div>
          </div>
          
          <div className="section-title">各阶段辅食参考</div>
          {[
            { age: "6-8月", stage: "泥糊期", foods: ["高铁米粉（强化铁）", "南瓜泥", "胡萝卜泥", "土豆泥", "苹果泥", "香蕉泥", "牛油果泥", "鸡肉泥", "猪肝泥（每周1次）"] },
            { age: "8-10月", stage: "颗粒期", foods: ["烂粥/烂面", "蛋黄（从1/4开始）", "鱼泥（三文鱼/鳕鱼）", "豆腐", "碎菜（西兰花/菠菜）", "手指食物：蒸软的胡萝卜条、南瓜块"] },
            { age: "10-12月", stage: "块状期", foods: ["软饭", "小馄饨/饺子", "蒸蛋羹", "鱼块/肉末", "全蛋（确认不过敏）", "酸奶", "手指食物多样化"] },
          ].map((stage, i) => (
            <div className="card" key={i}>
              <div className="card-header">
                <span className="card-title">{stage.stage}（{stage.age}）</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {stage.foods.map((food, j) => (
                  <span key={j} className="chip chip-success" style={{ fontSize: 12 }}>{food}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
