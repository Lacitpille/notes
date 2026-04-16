import { useState } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a26",
  border: "#2a2a3a",
  borderActive: "#5a4ff0",
  text: "#e8e6f0",
  textMuted: "#8a87a0",
  accent: "#5a4ff0",
  accentGlow: "rgba(90, 79, 240, 0.15)",
  green: "#34d399",
  greenGlow: "rgba(52, 211, 153, 0.12)",
  amber: "#fbbf24",
  amberGlow: "rgba(251, 191, 36, 0.12)",
  rose: "#f472b6",
  roseGlow: "rgba(244, 114, 182, 0.12)",
  cyan: "#22d3ee",
  cyanGlow: "rgba(34, 211, 238, 0.12)",
};

const pipelineStages = [
  {
    id: "seed",
    label: "SEED",
    subtitle: "You → Raw Input",
    color: COLORS.amber,
    glow: COLORS.amberGlow,
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
    color: COLORS.accent,
    glow: COLORS.accentGlow,
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
    color: COLORS.green,
    glow: COLORS.greenGlow,
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
    color: COLORS.cyan,
    glow: COLORS.cyanGlow,
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
    color: COLORS.rose,
    glow: COLORS.roseGlow,
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
    color: COLORS.amber,
    glow: COLORS.amberGlow,
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

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const indent = depth * 24;

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          paddingLeft: indent,
          paddingTop: 4,
          paddingBottom: 4,
          cursor: hasChildren ? "pointer" : "default",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        {hasChildren && (
          <span style={{ color: COLORS.accent, fontSize: 10, width: 12, flexShrink: 0, userSelect: "none" }}>
            {open ? "▼" : "▶"}
          </span>
        )}
        {!hasChildren && <span style={{ width: 12, flexShrink: 0 }} />}
        <span
          style={{
            color: hasChildren ? COLORS.amber : COLORS.text,
            fontSize: 13,
            fontWeight: hasChildren ? 600 : 400,
          }}
        >
          {node.name}
        </span>
        {node.desc && (
          <span style={{ color: COLORS.textMuted, fontSize: 11, fontStyle: "italic" }}>
            {node.desc}
          </span>
        )}
      </div>
      {open &&
        hasChildren &&
        node.children.map((child, i) => (
          <TreeNode key={i} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}

function PipelineCard({ stage, index, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? stage.glow : COLORS.surface,
        border: `1px solid ${isActive ? stage.color : COLORS.border}`,
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
            background: stage.color,
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 10,
            color: stage.color,
            background: `${stage.color}18`,
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
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: stage.color,
            letterSpacing: 1,
          }}
        >
          {stage.label}
        </span>
      </div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: isActive ? 12 : 0 }}>
        {stage.subtitle}
      </div>
      {isActive && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{ marginBottom: 10 }}>
            {stage.items.map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  color: COLORS.text,
                  padding: "4px 0",
                  paddingLeft: 12,
                  borderLeft: `1px solid ${stage.color}30`,
                  marginBottom: 4,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
            <div>
              <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>
                Agent
              </span>
              <div
                style={{
                  fontSize: 12,
                  color: stage.color,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  marginTop: 2,
                }}
              >
                {stage.agent}
              </div>
            </div>
            {stage.tools.length > 0 && (
              <div>
                <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>
                  Reads
                </span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
                  {stage.tools.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 10,
                        color: COLORS.text,
                        background: COLORS.surfaceHover,
                        padding: "2px 6px",
                        borderRadius: 3,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
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
        <path d="M10 0 L10 10 M5 6 L10 12 L15 6" stroke={color || COLORS.textMuted} strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function MathPostPipeline() {
  const [activeStage, setActiveStage] = useState(0);
  const [tab, setTab] = useState("pipeline");

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        minHeight: "100vh",
        fontFamily: "'Crimson Pro', 'Georgia', serif",
        padding: "32px 20px",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: COLORS.accent,
            letterSpacing: 3,
            marginBottom: 8,
          }}
        >
          MATH POST AGENT
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          Knowledge Refinement Pipeline
        </h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>
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
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {["pipeline", "repo"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${tab === t ? COLORS.accent : "transparent"}`,
              color: tab === t ? COLORS.text : COLORS.textMuted,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              padding: "8px 20px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.15s ease",
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
              marginBottom: 28,
              padding: "16px 12px",
              background: COLORS.surface,
              borderRadius: 8,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            {pipelineStages.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: s.color,
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: activeStage === i ? s.glow : "transparent",
                    border: `1px solid ${activeStage === i ? s.color + "40" : "transparent"}`,
                    transition: "all 0.15s ease",
                  }}
                  onClick={() => setActiveStage(i)}
                >
                  {s.label}
                </span>
                {i < pipelineStages.length - 1 && (
                  <span style={{ color: COLORS.textMuted, fontSize: 12 }}>→</span>
                )}
              </div>
            ))}
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
                />
                {i < pipelineStages.length - 1 && (
                  <FlowArrow color={pipelineStages[i + 1].color} />
                )}
              </div>
            ))}
          </div>

          {/* Agent assignment summary */}
          <div
            style={{
              marginTop: 28,
              padding: 18,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: COLORS.textMuted,
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              AGENT ASSIGNMENT RATIONALE
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text }}>
              <p style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.accent, fontWeight: 600 }}>Claude Code</span> handles refinement & deepening — it can read your repo, run Lean 4, and edit drafts in place.
              </p>
              <p style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.green, fontWeight: 600 }}>Gemini</span> handles divergence research — its deep research mode is strong for literature survey and surfacing unexpected connections.
              </p>
              <p style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.cyan, fontWeight: 600 }}>Codex</span> handles async deepening tasks — spin off proof attempts and formalization as background jobs.
              </p>
              <p>
                <span style={{ color: COLORS.rose, fontWeight: 600 }}>Separate Claude session</span> for critique — fresh context prevents anchoring to the draft's framing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Repo Tab */}
      {tab === "repo" && (
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "16px 12px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: COLORS.textMuted,
              letterSpacing: 2,
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            REPOSITORY LAYOUT
          </div>
          <TreeNode node={repoTree} depth={0} />

          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: COLORS.textMuted,
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              KEY FILE: CLAUDE.md
            </div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
              <p style={{ marginBottom: 8 }}>
                This is the project-level instruction file that Claude Code and Codex read automatically. It should contain:
              </p>
              <div style={{ paddingLeft: 12, borderLeft: `1px solid ${COLORS.accent}30`, fontSize: 12, lineHeight: 1.8 }}>
                <div style={{ color: COLORS.textMuted }}>1. Always read <span style={{ color: COLORS.amber }}>context/context.md</span> before any task</div>
                <div style={{ color: COLORS.textMuted }}>2. Follow notation from <span style={{ color: COLORS.amber }}>context/conventions.md</span></div>
                <div style={{ color: COLORS.textMuted }}>3. After completing any stage, update <span style={{ color: COLORS.amber }}>metadata.json</span></div>
                <div style={{ color: COLORS.textMuted }}>4. Never skip the critique phase</div>
                <div style={{ color: COLORS.textMuted }}>5. Flag speculative claims explicitly with <span style={{ color: COLORS.rose }}>[conjecture]</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
