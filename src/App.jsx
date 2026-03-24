import { useState } from “react”;

const MODELS = [
// ── OpenAI ─────────────────────────────────────────────
{
id: “openai/gpt-4.1-2025-04-14”,
name: “GPT-4.1”,
provider: “OpenAI”,
color: “#10b981”,
emoji: “🧠”,
tagline: “Best for Complex Reasoning & Code”,
bestFor: [“Advanced code generation”, “Long-form writing & storytelling”, “Legal & contract analysis”, “Multi-step reasoning”, “Deep research tasks”],
avoid: “Overkill for simple tasks”,
speed: 4, power: 10, cost: 4,
verification: “TEE”,
category: [“Coding”, “Writing”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “openai/gpt-4o”,
name: “GPT-4o”,
provider: “OpenAI”,
color: “#06b6d4”,
emoji: “👁️”,
tagline: “Best for Vision & Balanced Tasks”,
bestFor: [“Image & chart analysis”, “NFT trait reading”, “Crypto market summaries”, “Balanced chat apps”, “Customer support bots”],
avoid: “Not ideal for pure bulk text”,
speed: 7, power: 9, cost: 3,
verification: “TEE”,
category: [“Vision”, “Crypto”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “openai/o4-mini”,
name: “o4-mini”,
provider: “OpenAI”,
color: “#34d399”,
emoji: “⚙️”,
tagline: “Best for Affordable Fast Reasoning”,
bestFor: [“Math & logic problems”, “Code review & debugging”, “STEM questions”, “Quick reasoning chains”, “Cost-efficient inference”],
avoid: “Not for creative or narrative tasks”,
speed: 8, power: 8, cost: 2,
verification: “TEE”,
category: [“Coding”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
// ── Anthropic ──────────────────────────────────────────
{
id: “anthropic/claude-4.0-sonnet”,
name: “Claude Sonnet 4.6”,
provider: “Anthropic”,
color: “#f97316”,
emoji: “✍️”,
tagline: “Best for Storytelling & Safe Outputs”,
bestFor: [“Creative storytelling & world building”, “NFT lore & character writing”, “Nuanced instruction following”, “Safe & ethical AI outputs”, “Long document drafting”],
avoid: “Slower for high-volume pipelines”,
speed: 6, power: 9, cost: 3,
verification: “TEE”,
category: [“Writing”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “anthropic/claude-3.7-sonnet”,
name: “Claude 3.7 Sonnet”,
provider: “Anthropic”,
color: “#fb923c”,
emoji: “🖊️”,
tagline: “Best for Nuanced Long-form Writing”,
bestFor: [“Long narratives & essays”, “Sensitive topic handling”, “Research summaries”, “Complex tone management”, “Careful document analysis”],
avoid: “Not the fastest option available”,
speed: 5, power: 9, cost: 3,
verification: “TEE”,
category: [“Writing”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “anthropic/claude-3.5-haiku”,
name: “Claude 3.5 Haiku”,
provider: “Anthropic”,
color: “#fbbf24”,
emoji: “⚡”,
tagline: “Best for Fast Claude-Quality Output”,
bestFor: [“Quick chat replies”, “Discord & Telegram bots”, “Text classification”, “High-volume content tagging”, “Rapid summarization”],
avoid: “Struggles with complex multi-step tasks”,
speed: 9, power: 7, cost: 1,
verification: “TEE”,
category: [“Speed”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
// ── Google ─────────────────────────────────────────────
{
id: “google/gemini-2.5-pro”,
name: “Gemini 2.5 Pro”,
provider: “Google”,
color: “#4f46e5”,
emoji: “🌐”,
tagline: “Best for Long Context & Deep Research”,
bestFor: [“1M token context window”, “Deep research synthesis”, “Complex multimodal tasks”, “Science & technical writing”, “Comprehensive document review”],
avoid: “Expensive for lightweight tasks”,
speed: 5, power: 10, cost: 4,
verification: “TEE”,
category: [“Analysis”, “Research”, “Vision”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “google/gemini-2.5-flash”,
name: “Gemini 2.5 Flash”,
provider: “Google”,
color: “#818cf8”,
emoji: “💡”,
tagline: “Best for Fast Multimodal Apps”,
bestFor: [“Real-time web applications”, “Image + text pipelines”, “Fast document Q&A”, “Chatbot interfaces”, “Rapid content generation”],
avoid: “Less powerful than Pro for deep tasks”,
speed: 9, power: 8, cost: 2,
verification: “TEE”,
category: [“Vision”, “Speed”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “google/gemini-2.5-flash-lite”,
name: “Gemini 2.5 Flash Lite”,
provider: “Google”,
color: “#a5b4fc”,
emoji: “🪶”,
tagline: “Best for Ultra-Lightweight Tasks”,
bestFor: [“Mobile AI integrations”, “Simple Q&A bots”, “Real-time chat”, “High-frequency API calls”, “Lean production pipelines”],
avoid: “Not for deep reasoning or long docs”,
speed: 10, power: 6, cost: 1,
verification: “TEE”,
category: [“Speed”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “google/gemini-2.0-flash”,
name: “Gemini 2.0 Flash”,
provider: “Google”,
color: “#6366f1”,
emoji: “🔮”,
tagline: “Best for Agentic & Tool-Use Workflows”,
bestFor: [“Agentic multi-step workflows”, “Tool calling & function use”, “Code generation tasks”, “Automated pipelines”, “Google ecosystem apps”],
avoid: “Newer Flash models may outperform it”,
speed: 8, power: 8, cost: 2,
verification: “TEE”,
category: [“Agents”, “Coding”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
// ── xAI Grok ───────────────────────────────────────────
{
id: “x-ai/grok-3-beta”,
name: “Grok 3 Beta”,
provider: “xAI”,
color: “#ef4444”,
emoji: “🔥”,
tagline: “Best for Crypto & Financial Analysis”,
bestFor: [“Crypto market deep-dives”, “DeFi trading insights”, “Advanced financial modeling”, “On-chain data reasoning”, “Math & quantitative problems”],
avoid: “Overkill for simple generation”,
speed: 6, power: 10, cost: 4,
verification: “TEE”,
category: [“Crypto”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “x-ai/grok-3-mini-beta”,
name: “Grok 3 Mini Beta”,
provider: “xAI”,
color: “#f87171”,
emoji: “📊”,
tagline: “Best for Affordable Market Insights”,
bestFor: [“Token & coin analysis”, “Quick DeFi Q&A”, “News summarization”, “Light financial reasoning”, “Market sentiment checks”],
avoid: “Less capable than full Grok 3”,
speed: 8, power: 7, cost: 2,
verification: “TEE”,
category: [“Crypto”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “x-ai/grok-4.1-fast”,
name: “Grok 4.1 Fast”,
provider: “xAI”,
color: “#dc2626”,
emoji: “🚀”,
tagline: “Best for Fast Frontier Reasoning”,
bestFor: [“Fast frontier-level reasoning”, “Real-time trading analysis”, “Low-latency financial apps”, “Rapid science Q&A”, “Live market updates”],
avoid: “Newer, less community-tested”,
speed: 9, power: 9, cost: 3,
verification: “TEE”,
category: [“Crypto”, “Analysis”, “Speed”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “x-ai/grok-4-1-fast-non-reasoning”,
name: “Grok 4.1 Fast (NR)”,
provider: “xAI”,
color: “#b91c1c”,
emoji: “⚡”,
tagline: “Best for Ultra-Fast Non-Reasoning Tasks”,
bestFor: [“Instant text generation”, “Rapid content drafting”, “High-speed summarization”, “Quick label/classification”, “Low-latency chatbots”],
avoid: “Not for complex step-by-step reasoning”,
speed: 10, power: 7, cost: 2,
verification: “TEE”,
category: [“Speed”, “General”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “x-ai/grok-2-1212”,
name: “Grok 2”,
provider: “xAI”,
color: “#fca5a5”,
emoji: “🧮”,
tagline: “Best for Proven Science & Math Tasks”,
bestFor: [“Math & logic problems”, “Scientific reasoning”, “Technical documentation”, “Code debugging”, “Structured analysis”],
avoid: “Superseded by Grok 3 for frontier tasks”,
speed: 7, power: 8, cost: 2,
verification: “TEE”,
category: [“Analysis”, “Coding”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “x-ai/grok-2-vision-latest”,
name: “Grok 2 Vision”,
provider: “xAI”,
color: “#fcd34d”,
emoji: “🕵️”,
tagline: “Best for Visual Crypto & Chart Reading”,
bestFor: [“Trading chart analysis”, “Screenshot data extraction”, “NFT visual inspection”, “Image OCR tasks”, “Visual DeFi dashboards”],
avoid: “Grok 3 preferred for pure text tasks”,
speed: 7, power: 7, cost: 2,
verification: “TEE”,
category: [“Vision”, “Crypto”],
hubUrl: “https://hub.opengradient.ai/models”,
},
// ── Meta / Open Source ─────────────────────────────────
{
id: “meta-llama/Llama-3.1-70B-Instruct”,
name: “Llama 3.1 70B”,
provider: “Meta”,
color: “#8b5cf6”,
emoji: “🤖”,
tagline: “Best for On-Chain AI Agents”,
bestFor: [“DeFi trading agents”, “On-chain automated workflows”, “Open-source AI builds”, “Agentic multi-step reasoning”, “Verifiable AI (TEE/ZKML)”],
avoid: “Not for quick simple tasks”,
speed: 5, power: 8, cost: 2,
verification: “TEE / ZKML”,
category: [“Agents”, “Coding”, “Crypto”],
hubUrl: “https://hub.opengradient.ai/models/meta-llama/Llama-3.1-70B-Instruct”,
},
{
id: “mistralai/Mistral-7B-Instruct-v0.3”,
name: “Mistral 7B”,
provider: “Mistral AI”,
color: “#f59e0b”,
emoji: “🌪️”,
tagline: “Best for Speed & Bulk Pipelines”,
bestFor: [“High-volume content generation”, “Text tagging & classification”, “FAQ chatbots”, “Quick article summaries”, “Cost-efficient API calls”],
avoid: “Not for complex or nuanced reasoning”,
speed: 10, power: 6, cost: 1,
verification: “TEE / ZKML”,
category: [“Speed”, “General”],
hubUrl: “https://hub.opengradient.ai/models/mistralai/Mistral-7B-Instruct-v0.3”,
},
// ── OpenGradient OG Crypto Models ──────────────────────
{
id: “opengradient/BTCUSDT-1h-spot-forecasting-model”,
name: “BTC 1H Forecast”,
provider: “OpenGradient”,
color: “#f7931a”,
emoji: “₿”,
tagline: “Best for BTC Price Prediction”,
bestFor: [“BTC/USDT 1H price signals”, “Automated BTC trading bots”, “BitQuant agent integration”, “On-chain quant strategies”, “DeFi BTC position sizing”],
avoid: “Only for BTC forecasting — not general purpose”,
speed: 10, power: 8, cost: 1,
verification: “ZKML / TEE”,
category: [“Crypto”, “Agents”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “opengradient/ETHUSDT-1h-volatility-forecasting-model”,
name: “ETH 1H Volatility”,
provider: “OpenGradient”,
color: “#627eea”,
emoji: “Ξ”,
tagline: “Best for ETH Risk & Volatility”,
bestFor: [“ETH/USDT volatility forecasting”, “Options & derivatives strategies”, “AMM fee optimization”, “Risk-adjusted ETH positions”, “Portfolio hedging tools”],
avoid: “ETH-specific use cases only”,
speed: 10, power: 8, cost: 1,
verification: “ZKML / TEE”,
category: [“Crypto”, “Analysis”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “opengradient/SOLUSDT-1h-spot-forecasting-model”,
name: “SOL 1H Forecast”,
provider: “OpenGradient”,
color: “#9945ff”,
emoji: “◎”,
tagline: “Best for Solana Price Signals”,
bestFor: [“SOL/USDT 1H spot price signals”, “Solana automated trading bots”, “On-chain Solana quant strategies”, “DeFi SOL position management”, “Solana ecosystem integrations”],
avoid: “SOL-specific forecasting only”,
speed: 10, power: 8, cost: 1,
verification: “ZKML / TEE”,
category: [“Crypto”, “Agents”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “opengradient/SUI-30m-spot-forecasting-model”,
name: “SUI 30m Forecast”,
provider: “OpenGradient”,
color: “#4da2ff”,
emoji: “💧”,
tagline: “Best for Short-Term SUI Signals”,
bestFor: [“SUI/USDT 30-minute price forecasting”, “Short-term SUI trading”, “High-frequency SUI strategies”, “On-chain SUI DeFi automation”, “Liquidity management on SUI”],
avoid: “Short-term SUI use cases only”,
speed: 10, power: 8, cost: 1,
verification: “ZKML / TEE”,
category: [“Crypto”, “Agents”],
hubUrl: “https://hub.opengradient.ai/models”,
},
{
id: “opengradient/SUI-6h-spot-forecasting-model”,
name: “SUI 6H Forecast”,
provider: “OpenGradient”,
color: “#38bdf8”,
emoji: “🌊”,
tagline: “Best for Medium-Term SUI Trends”,
bestFor: [“SUI/USDT 6-hour trend analysis”, “Swing trading on SUI”, “DeFi yield strategy planning”, “On-chain SUI portfolio management”, “Medium-term SUI positioning”],
avoid: “SUI medium-term strategies only”,
speed: 10, power: 8, cost: 1,
verification: “ZKML / TEE”,
category: [“Crypto”, “Agents”],
hubUrl: “https://hub.opengradient.ai/models”,
},
];

const CATEGORIES = [“All”, “Crypto”, “Writing”, “Coding”, “Vision”, “Speed”, “Agents”, “Analysis”, “Research”];

const PROVIDER_META = {
“OpenAI”:       { color: “#10b981”, short: “OAI” },
“Anthropic”:    { color: “#f97316”, short: “ANT” },
“Google”:       { color: “#4f46e5”, short: “GGL” },
“xAI”:          { color: “#ef4444”, short: “XAI” },
“Meta”:         { color: “#8b5cf6”, short: “META” },
“Mistral AI”:   { color: “#f59e0b”, short: “MIS” },
“OpenGradient”: { color: “#06b6d4”, short: “OG” },
};

function Pip({ filled, color }) {
return <div style={{ width: 7, height: 7, borderRadius: 2, background: filled ? color : “rgba(255,255,255,0.08)” }} />;
}

function ModelCard({ model }) {
const [open, setOpen] = useState(false);
const provColor = PROVIDER_META[model.provider]?.color || model.color;

return (
<div
onClick={() => setOpen(o => !o)}
style={{
background: open ? `${model.color}0d` : “rgba(255,255,255,0.025)”,
border: `1px solid ${open ? model.color + "55" : "rgba(255,255,255,0.07)"}`,
borderRadius: 14, padding: “18px 20px”,
cursor: “pointer”, transition: “all 0.22s ease”,
position: “relative”, overflow: “hidden”,
}}
>
{open && <div style={{ position: “absolute”, top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${model.color}, transparent)` }} />}

```
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 22, width: 40, height: 40, flexShrink: 0,
        background: `${model.color}18`, border: `1px solid ${model.color}33`,
        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
      }}>{model.emoji}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: model.color }}>{model.name}</span>
          <span style={{
            fontSize: 9, color: provColor, background: `${provColor}18`,
            border: `1px solid ${provColor}33`, borderRadius: 20,
            padding: "2px 8px", fontFamily: "monospace", letterSpacing: 1, whiteSpace: "nowrap"
          }}>{model.provider}</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'Lora', serif", fontStyle: "italic" }}>
          {model.tagline}
        </div>
      </div>
    </div>
    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
  </div>

  {open && (
    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 3, fontFamily: "monospace", marginBottom: 10 }}>BEST FOR</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {model.bestFor.map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: model.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontFamily: "'Syne', sans-serif" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "8px 12px", display: "flex", gap: 8, alignItems: "flex-start" }}>
        <span style={{ fontSize: 11 }}>⚠️</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "'Lora', serif", fontStyle: "italic" }}>{model.avoid}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { label: "SPEED", val: model.speed, color: "#34d399" },
          { label: "POWER", val: model.power, color: model.color },
          { label: "COST EFF", val: 5 - model.cost + 1, color: "#fbbf24" },
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontFamily: "monospace", marginBottom: 6 }}>{s.label}</div>
            <div style={{ display: "flex", gap: 3 }}>{Array.from({ length: 5 }).map((_, i) => <Pip key={i} filled={i < Math.ceil(s.val / 2)} color={s.color} />)}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, color: model.color, background: `${model.color}18`, border: `1px solid ${model.color}33`, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>{model.verification}</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>ID: {model.id}</span>
        </div>
        <a href={model.hubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
          background: `${model.color}22`, border: `1px solid ${model.color}55`, color: model.color,
          padding: "6px 16px", borderRadius: 8, textDecoration: "none",
          fontSize: 11, fontFamily: "monospace", letterSpacing: 1
        }}>USE ON OG →</a>
      </div>
    </div>
  )}
</div>
```

);
}

export default function OGModelHub() {
const [activeCategory, setActiveCategory] = useState(“All”);
const [activeProvider, setActiveProvider] = useState(“All”);
const [search, setSearch] = useState(””);

const providers = [“All”, …Object.keys(PROVIDER_META)];

const filtered = MODELS.filter(m => {
const matchCat = activeCategory === “All” || m.category.includes(activeCategory);
const matchProv = activeProvider === “All” || m.provider === activeProvider;
const q = search.toLowerCase();
const matchSearch = !q || m.name.toLowerCase().includes(q) || m.tagline.toLowerCase().includes(q) || m.bestFor.some(b => b.toLowerCase().includes(q)) || m.provider.toLowerCase().includes(q);
return matchCat && matchProv && matchSearch;
});

// Group filtered by provider
const groups = providers.filter(p => p !== “All”).map(p => ({
provider: p,
models: filtered.filter(m => m.provider === p),
})).filter(g => g.models.length > 0);

return (
<div style={{ minHeight: “100vh”, background: “#04060c”, color: “white”, fontFamily: “‘Syne’, sans-serif” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Lora:ital@0;1&display=swap'); @keyframes fadein { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} } * { box-sizing: border-box; } input:focus { outline: none; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #ffffff22; border-radius: 4px; } a:hover { opacity: 0.8; } button:hover { opacity: 0.85; cursor: pointer; }`}</style>

```
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)" }} />

  <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "52px 20px 80px" }}>

    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 48, animation: "fadein 0.5s ease" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 30, padding: "5px 18px" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
        <span style={{ fontSize: 10, letterSpacing: 3, color: "#818cf8", fontFamily: "monospace" }}>OPENGRADIENT · VERIFIED AI HUB</span>
      </div>
      <h1 style={{ fontWeight: 800, fontSize: "clamp(28px, 5vw, 60px)", margin: "0 0 12px", letterSpacing: -2, lineHeight: 1.05 }}>
        Every Model.<br />
        <span style={{ background: "linear-gradient(120deg, #6366f1, #06b6d4, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One Decentralized Hub.</span>
      </h1>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, margin: 0, fontFamily: "'Lora', serif" }}>
        {MODELS.length} models · 7 providers · All TEE-verified on OpenGradient. Click any card to explore.
      </p>
    </div>

    {/* Search */}
    <div style={{ maxWidth: 500, margin: "0 auto 28px", animation: "fadein 0.6s ease" }}>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search by task, provider, or use case..."
        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 18px", color: "white", fontSize: 14, fontFamily: "'Syne', sans-serif" }}
      />
    </div>

    {/* Category Filters */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10, animation: "fadein 0.65s ease" }}>
      {CATEGORIES.map(c => (
        <button key={c} onClick={() => setActiveCategory(c)} style={{
          background: activeCategory === c ? "white" : "rgba(255,255,255,0.05)",
          border: `1px solid ${activeCategory === c ? "white" : "rgba(255,255,255,0.1)"}`,
          color: activeCategory === c ? "#04060c" : "rgba(255,255,255,0.5)",
          borderRadius: 30, padding: "6px 16px", fontSize: 12,
          fontWeight: activeCategory === c ? 700 : 400,
          fontFamily: "'Syne', sans-serif", transition: "all 0.2s"
        }}>{c}</button>
      ))}
    </div>

    {/* Provider Filters */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 36, animation: "fadein 0.7s ease" }}>
      {providers.map(p => {
        const pc = PROVIDER_META[p]?.color || "white";
        return (
          <button key={p} onClick={() => setActiveProvider(p)} style={{
            background: activeProvider === p ? `${pc}22` : "transparent",
            border: `1px solid ${activeProvider === p ? pc + "88" : "rgba(255,255,255,0.07)"}`,
            color: activeProvider === p ? pc : "rgba(255,255,255,0.3)",
            borderRadius: 20, padding: "4px 14px", fontSize: 11,
            fontFamily: "monospace", letterSpacing: 1, transition: "all 0.2s"
          }}>{p}</button>
        );
      })}
    </div>

    {/* Result count */}
    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: 2, marginBottom: 28, textAlign: "center" }}>
      SHOWING {filtered.length} OF {MODELS.length} MODELS
    </div>

    {/* Grouped Cards */}
    {groups.length === 0 ? (
      <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>No models match your search.</div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 40, animation: "fadein 0.8s ease" }}>
        {groups.map(({ provider, models }) => {
          const pc = PROVIDER_META[provider]?.color || "#ffffff";
          return (
            <div key={provider}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${pc}44, transparent)` }} />
                <span style={{ fontSize: 11, letterSpacing: 3, color: pc, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  {provider.toUpperCase()} · {models.length} MODEL{models.length !== 1 ? "S" : ""}
                </span>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${pc}44)` }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
                {models.map(m => <ModelCard key={m.id} model={m} />)}
              </div>
            </div>
          );
        })}
      </div>
    )}

    {/* Footer */}
    <div style={{ marginTop: 64, textAlign: "center", padding: "28px 24px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 20 }}>
      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: "0 0 16px", fontFamily: "monospace", letterSpacing: 1 }}>
        ALL INFERENCE IS TEE-VERIFIED · TRUSTLESS · ON-CHAIN · POWERED BY OPENGRADIENT
      </p>
      <a href="https://hub.opengradient.ai/models" target="_blank" rel="noopener noreferrer" style={{
        display: "inline-block", background: "linear-gradient(135deg, #6366f1, #06b6d4)",
        color: "white", textDecoration: "none", padding: "13px 36px",
        borderRadius: 12, fontWeight: 700, fontSize: 13,
        letterSpacing: 1, fontFamily: "'Syne', sans-serif"
      }}>EXPLORE OPENGRADIENT HUB →</a>
    </div>
  </div>
</div>
```

);
}
