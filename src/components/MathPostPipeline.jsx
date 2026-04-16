import { useState, useEffect } from "react";

function useTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

const lightColors = {
  bg: "#ffffff",
  surface: "#f8fafc",
  surfaceHover: "#f1f5f9",
  border: "#e2e8f0",
  text: "#111827",
  textMuted: "#6b7280",
  accent: "#4f46e5",
  accentGlow: "rgba(79, 70, 229, 0.07)",
  green: "#059669",
  greenGlow: "rgba(5, 150, 105, 0.07)",
  amber: "#b45309",
  amberGlow: "rgba(180, 83, 9, 0.07)",
  rose: "#be123c",
  roseGlow: "rgba(190, 18, 60, 0.07)",
  cyan: "#0e7490",
  cyanGlow: "rgba(14, 116, 144, 0.07)",
  chrome: "#f1f5f9",
  chromeBorder: "#e2e8f0",
  outerBorder: "#e2e8f0",
  shadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
};

const darkColors = {
  bg: "#1f2937",
  surface: "#111827",
  surfaceHover: "#374151",
  border: "#374151",
  text: "#f3f4f6",
  textMuted: "#9ca3af",
  accent: "#818cf8",
  accentGlow: "rgba(129, 140, 248, 0.12)",
  green: "#34d399",
  greenGlow: "rgba(52, 211, 153, 0.10)",
  amber: "#fbbf24",
  amberGlow: "rgba(251, 191, 36, 0.10)",
  rose: "#fb7185",
  roseGlow: "rgba(251, 113, 133, 0.10)",
  cyan: "#22d3ee",
  cyanGlow: "rgba(34, 211, 238, 0.10)",
  chrome: "#111827",
  chromeBorder: "#374151",
  outerBorder: "#374151",
  shadow: "0 2px 16px rgba(0,0,0,0.40)",
};

const pipelineStages = [
  {
    id: "seed",
    label: "SEED",
    subtitle: "You → Raw Input",
    colorKey: "amber",
    items: [
      "Drop a rough idea, paper link, half-formed observation",
      "Tag with themes: category-theory, formalization, etc.",
      "Agent indexes into running context doc",
    ],
    agent: "You",
    tools: [],
  },
  {
    id: "refine",
    label: "REFINE",
    subtitle: "Agent → First Pass",
    colorKey: "accent",
    items: [
      "Clarify definitions, fix notation",
      "Structure: motivation → setup → insight → implications",
      "Cross-reference with your established results",
    ],
    agent: "Claude Code / Codex",
    tools: ["context.md", "conventions.md", "seeds/*.md"],
  },
  {
    id: "diverge",
    label: "DIVERGE",
    subtitle: "Agent → Explore",
    colorKey: "green",
    items: [
      "Fan out from the core idea into 3–5 directions",
      "Surface connections to your other threads",
      "Search literature, find related formalizations",
    ],
    agent: "Gemini (deep research) + Claude",
    tools: ["web search", "arxiv", "Lean 4 docs", "theme-graph.json"],
  },
  {
    id: "deepen",
    label: "DEEPEN",
    subtitle: "Agent → Prove & Stress-Test",
    colorKey: "cyan",
    items: [
      "Fill in proof details, work out examples",
      "Attempt Lean 4 formalization of key claims",
      "Stress-test edge cases, find counterexamples",
    ],
    agent: "Claude Code + Codex",
    tools: ["lean4", "proofs/", "examples/"],
  },
  {
    id: "critique",
    label: "CRITIQUE",
    subtitle: "Agent → Adversarial Review",
    colorKey: "rose",
    items: [
      "Attack its own draft: gaps, imprecision, triviality?",
      "Check notation consistency with your conventions",
      "Is it interesting or just technically correct?",
    ],
    agent: "Separate Claude session (fresh eyes)",
    tools: ["conventions.md", "quality-rubric.md"],
  },
  {
    id: "publish",
    label: "PUBLISH",
    subtitle: "You → Final Gate",
    colorKey: "amber",
    items: [
      "You review, add voice, flag speculative vs. established",
      "Update context.md with new results & open questions",
      "Commit to posts/, update theme-graph.json",
    ],
    agent: "You + git",
    tools: ["posts/", "context.md", "theme-graph.json"],
  },
];

const repoTree = {
  name: "math-posts/",
  children: [
    {
      name: "context/",
      desc: "Accumulated meta-knowledge",
      children: [
        { name: "context.md", desc: "Running research journal index — themes, open Qs, results" },
        { name: "conventions.md", desc: "Notation, style, definitions you've standardized" },
        { name: "quality-rubric.md", desc: "What makes a post good? Criteria for the critique agent" },
        { name: "theme-graph.json", desc: "Tag graph — topics and their connections" },
      ],
    },
    {
      name: "seeds/",
      desc: "Raw inputs you drop in",
      children: [
        { name: "YYYY-MM-DD-slug.md", desc: "Timestamped seed: idea, link, observation" },
      ],
    },
    {
      name: "drafts/",
      desc: "Work in progress",
      children: [
        { name: "slug/", desc: "One folder per draft", children: [
          { name: "draft.md", desc: "Current draft text" },
          { name: "divergence.md", desc: "Explored directions from DIVERGE phase" },
          { name: "critique.md", desc: "Agent critique notes" },
          { name: "metadata.json", desc: "Stage, tags, timestamps, agent logs" },
        ]},
      ],
    },
    {
      name: "proofs/",
      desc: "Lean 4 formalizations & scratch proofs",
      children: [
        { name: "*.lean", desc: "Formalized claims" },
        { name: "scratch/", desc: "Informal proof attempts" },
      ],
    },
    {
      name: "posts/",
      desc: "Published output",
      children: [
        { name: "YYYY-MM-DD-title.md", desc: "Final polished post" },
      ],
    },
    {
      name: "agents/",
      desc: "Agent configs & prompts",
      children: [
        { name: "refine.md", desc: "System prompt for refinement agent" },
        { name: "diverge.md", desc: "System prompt for divergence agent" },
        { name: "deepen.md", desc: "System prompt for deepening agent" },
        { name: "critique.md", desc: "System prompt for critique agent" },
        { name: "orchestrator.py", desc: "Pipeline runner — chains agents, manages state" },
      ],
    },
    {
      name: "scripts/",
      desc: "Automation",
      children: [
        { name: "new-seed.sh", desc: "Scaffold a new seed from template" },
        { name: "run-pipeline.sh", desc: "Run full or partial pipeline on a draft" },
        { name: "update-context.py", desc: "Auto-update context.md after publish" },
      ],
    },
    {
      name: "CLAUDE.md",
      desc: "Project instructions for Claude Code / Codex",
    },
  ],
};

function TreeNode({ node, depth = 0, colors }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const indent = depth * 20;

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          paddingLeft: indent,
          paddingTop: 5,
          paddingBottom: 5,
          cursor: hasChildren ? "pointer" : "default",
          fontFamily: "ui-monospace, 'Fira Code', monospace",
        }}
      >
        {hasChildren ? (
          <span style={{ color: colors.accent, fontSize: 11, width: 12, flexShrink: 0, userSelect: "none" }}>
            {open ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: 12, flexShrink: 0 }} />
        )}
        <span
          style={{
            color: hasChildren ? colors.amber : colors.text,
            fontSize: 14,
            fontWeight: hasChildren ? 600 : 400,
          }}
        >
          {node.name}
        </span>
        {node.desc && (
          <span style={{ color: colors.textMuted, fontSize: 13, fontStyle: "italic" }}>
            — {node.desc}
          </span>
        )}
      </div>
      {open &&
        hasChildren &&
        node.children.map((child, i) => (
          <TreeNode key={i} node={child} depth={depth + 1} colors={colors} />
        ))}
    </div>
  );
}

function PipelineCard({ stage, index, isActive, onClick, colors }) {
  const color = colors[stage.colorKey];
  const glow = colors[stage.colorKey + "Glow"];

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? glow : colors.surface,
        border: `1px solid ${isActive ? color : colors.border}`,
        borderRadius: 8,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: color,
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            color: color,
            background: `${color}18`,
            padding: "2px 8px",
            borderRadius: 4,
            letterSpacing: 1.5,
            fontWeight: 700,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 15,
            fontWeight: 700,
            color: color,
            letterSpacing: 0.5,
          }}
        >
          {stage.label}
        </span>
      </div>
      <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: isActive ? 12 : 0 }}>
        {stage.subtitle}
      </div>
      {isActive && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{ marginBottom: 10 }}>
            {stage.items.map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 14,
                  color: colors.text,
                  padding: "5px 0",
                  paddingLeft: 14,
                  borderLeft: `2px solid ${color}40`,
                  marginBottom: 4,
                  lineHeight: 1.55,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>
                Agent
              </span>
              <div
                style={{
                  fontSize: 13,
                  color: color,
                  fontFamily: "ui-monospace, monospace",
                  marginTop: 3,
                }}
              >
                {stage.agent}
              </div>
            </div>
            {stage.tools.length > 0 && (
              <div>
                <span style={{ fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>
                  Reads
                </span>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 3 }}>
                  {stage.tools.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        color: colors.text,
                        background: colors.surfaceHover,
                        border: `1px solid ${colors.border}`,
                        padding: "2px 7px",
                        borderRadius: 4,
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FlowArrow({ color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
      <svg width="20" height="16" viewBox="0 0 20 16">
        <path d="M10 0 L10 10 M5 6 L10 12 L15 6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function MathPostPipeline() {
  const isDark = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const [activeStage, setActiveStage] = useState(0);
  const [tab, setTab] = useState("pipeline");

  return (
    <div
      style={{
        background: colors.bg,
        border: `1px solid ${colors.outerBorder}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: colors.shadow,
        fontFamily: "inherit",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Chrome header */}
      <div
        style={{
          background: colors.chrome,
          borderBottom: `1px solid ${colors.chromeBorder}`,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fca5a5" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fcd34d" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#86efac" }} />
        </div>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: colors.textMuted }}>
          math-post-pipeline — interactive
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 24px", color: colors.text }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              color: colors.accent,
              letterSpacing: 3,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            Math Post Agent
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.25,
              margin: "0 0 8px 0",
            }}
          >
            Knowledge Refinement Pipeline
          </h2>
          <p style={{ fontSize: 15, color: colors.textMuted, lineHeight: 1.65, margin: 0 }}>
            Feed raw discoveries in. Get rigorous, thought-provoking posts out.
            Context accumulates across runs.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 24,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {["pipeline", "repo"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `2px solid ${tab === t ? colors.accent : "transparent"}`,
                color: tab === t ? colors.text : colors.textMuted,
                fontFamily: "ui-monospace, monospace",
                fontSize: 13,
                letterSpacing: 0.5,
                padding: "8px 20px",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.15s ease",
                marginBottom: -1,
              }}
            >
              {t === "pipeline" ? "Pipeline" : "Repo Structure"}
            </button>
          ))}
        </div>

        {/* Pipeline Tab */}
        {tab === "pipeline" && (
          <div>
            {/* Flow diagram summary */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 24,
                padding: "14px 12px",
                background: colors.surface,
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
              }}
            >
              {pipelineStages.map((s, i) => {
                const stageColor = colors[s.colorKey];
                const stageGlow = colors[s.colorKey + "Glow"];
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontFamily: "ui-monospace, monospace",
                        fontSize: 12,
                        color: stageColor,
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: "3px 9px",
                        borderRadius: 4,
                        background: activeStage === i ? stageGlow : "transparent",
                        border: `1px solid ${activeStage === i ? stageColor + "40" : "transparent"}`,
                        transition: "all 0.15s ease",
                      }}
                      onClick={() => setActiveStage(i)}
                    >
                      {s.label}
                    </span>
                    {i < pipelineStages.length - 1 && (
                      <span style={{ color: colors.textMuted, fontSize: 14 }}>→</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stage cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {pipelineStages.map((stage, i) => (
                <div key={stage.id}>
                  <PipelineCard
                    stage={stage}
                    index={i}
                    isActive={activeStage === i}
                    onClick={() => setActiveStage(i)}
                    colors={colors}
                  />
                  {i < pipelineStages.length - 1 && (
                    <FlowArrow color={colors[pipelineStages[i + 1].colorKey]} />
                  )}
                </div>
              ))}
            </div>

            {/* Agent assignment rationale */}
            <div
              style={{
                marginTop: 24,
                padding: "18px 20px",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: colors.textMuted,
                  letterSpacing: 2,
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                Agent Assignment Rationale
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: colors.text }}>
                <p style={{ margin: "0 0 12px 0" }}>
                  <span style={{ color: colors.accent, fontWeight: 600 }}>Claude Code</span> handles refinement & deepening — it can read your repo, run Lean 4, and edit drafts in place.
                </p>
                <p style={{ margin: "0 0 12px 0" }}>
                  <span style={{ color: colors.green, fontWeight: 600 }}>Gemini</span> handles divergence research — its deep research mode is strong for literature survey and surfacing unexpected connections.
                </p>
                <p style={{ margin: "0 0 12px 0" }}>
                  <span style={{ color: colors.cyan, fontWeight: 600 }}>Codex</span> handles async deepening tasks — spin off proof attempts and formalization as background jobs.
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: colors.rose, fontWeight: 600 }}>Separate Claude session</span> for critique — fresh context prevents anchoring to the draft's framing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Repo Tab */}
        {tab === "repo" && (
          <div
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "16px 14px",
            }}
          >
            <div
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                color: colors.textMuted,
                letterSpacing: 2,
                marginBottom: 16,
                paddingBottom: 10,
                borderBottom: `1px solid ${colors.border}`,
                textTransform: "uppercase",
              }}
            >
              Repository Layout
            </div>
            <TreeNode node={repoTree} depth={0} colors={colors} />

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: colors.textMuted,
                  letterSpacing: 2,
                  marginBottom: 12,
                  textTransform: "uppercase",
                }}
              >
                Key File: CLAUDE.md
              </div>
              <div style={{ fontSize: 15, color: colors.text, lineHeight: 1.7 }}>
                <p style={{ margin: "0 0 10px 0" }}>
                  This is the project-level instruction file that Claude Code and Codex read automatically. It should contain:
                </p>
                <div style={{ paddingLeft: 14, borderLeft: `2px solid ${colors.accent}40`, fontSize: 14, lineHeight: 1.85 }}>
                  <div style={{ color: colors.textMuted }}>1. Always read <span style={{ color: colors.amber }}>context/context.md</span> before any task</div>
                  <div style={{ color: colors.textMuted }}>2. Follow notation from <span style={{ color: colors.amber }}>context/conventions.md</span></div>
                  <div style={{ color: colors.textMuted }}>3. After completing any stage, update <span style={{ color: colors.amber }}>metadata.json</span></div>
                  <div style={{ color: colors.textMuted }}>4. Never skip the critique phase</div>
                  <div style={{ color: colors.textMuted }}>5. Flag speculative claims explicitly with <span style={{ color: colors.rose }}>[conjecture]</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
