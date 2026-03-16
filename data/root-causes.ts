export interface RootCause {
  key: string;
  label: string;
  color: string;
  icon: string;
  definition: string;
  example: string;
}

export interface Disposition {
  key: string;
  label: string;
  icon: string;
  description: string;
}

export const rootCauses: RootCause[] = [
  {
    key: "trafficking",
    label: "Trafficking / Setup Error",
    color: "#6366f1",
    icon: "⚙️",
    definition: "Incorrect campaign setup by internal team: wrong dates, budgets, targeting, creative assignment, pacing settings.",
    example: "Line item had wrong end date; frequency cap set too low.",
  },
  {
    key: "creative",
    label: "Creative / Asset Issue",
    color: "#8b5cf6",
    icon: "🎨",
    definition: "Problem with the ad creative: wrong size, broken file, rendering failure, broken click-through, policy violation.",
    example: "HTML5 creative throws JS error in Safari; click-through returns 404.",
  },
  {
    key: "platform",
    label: "Platform / System Bug",
    color: "#ef4444",
    icon: "🐛",
    definition: "Confirmed bug in ad server (GAM/MC), Operative, header bidding, or other internal tool.",
    example: "GAM not respecting priority settings after latest update.",
  },
  {
    key: "data",
    label: "Data / Reporting Discrepancy",
    color: "#f59e0b",
    icon: "📊",
    definition: "Measurement mismatch between systems: impression counting, timezone misalignment, methodology differences.",
    example: "15% discrepancy between GAM and DSP counting methods.",
  },
  {
    key: "inventory",
    label: "Inventory / Delivery Issue",
    color: "#ec4899",
    icon: "📦",
    definition: "Insufficient inventory, competing line items, forecasting errors, pacing problems NOT caused by config mistake.",
    example: "Campaign can't deliver because inventory is oversold.",
  },
  {
    key: "process",
    label: "Process / Communication Gap",
    color: "#14b8a6",
    icon: "🔗",
    definition: "Missing internal process, handoff failure, incomplete specs from sales, misunderstood requirements.",
    example: "IO lacked targeting specs; no QA checklist for new format.",
  },
  {
    key: "media_partner",
    label: "Media Partner Issue",
    color: "#6366f1",
    icon: "🤝",
    definition: "Root cause traced to media partner's platform, tags, rules, or data. AOS cannot control outcome.",
    example: "Partner frequency caps causing repeated ad exposures.",
  },
  {
    key: "client_vendor",
    label: "Client / Vendor Issue",
    color: "#f97316",
    icon: "👤",
    definition: "Root cause from client, agency, or external vendor: late assets, incorrect specs, third-party tag failure.",
    example: "Client pulled wrong date range; vendor VAST tag returning errors.",
  },
  {
    key: "operative",
    label: "Operative Platform Issue",
    color: "#a855f7",
    icon: "🔄",
    definition: "Root cause in Operative: data sync errors, workflow bugs, integration failures between Op1 and MC.",
    example: "Mismatch between Op1 and MC; workflow not triggering activation.",
  },
  {
    key: "expected",
    label: "Expected Behavior",
    color: "#22c55e",
    icon: "✅",
    definition: "System is working as designed. No actual issue; observed behavior aligns with expected functionality.",
    example: "Pacing algorithm intentionally front-loading impressions.",
  },
];

export const dispositions: Disposition[] = [
  {
    key: "duplicate",
    label: "Duplicate",
    icon: "📋",
    description: "Another ticket already exists for this issue. Link the duplicate.",
  },
  {
    key: "cannot_repro",
    label: "Cannot Reproduce",
    icon: "🔍",
    description: "Issue is not reproducible after investigation.",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: "🚫",
    description: "Ticket is no longer relevant or under investigation.",
  },
];
