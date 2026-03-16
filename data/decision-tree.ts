export interface TreeOption {
  label: string;
  next?: string;
  result?: string;
  type?: "disposition" | "rootcause";
}

export interface TreeStep {
  id: string;
  question: string;
  subtitle: string;
  options: TreeOption[];
}

export const treeSteps: TreeStep[] = [
  {
    id: "start",
    question: "Was the investigation resolved with a diagnosis?",
    subtitle: "Or was the ticket closed for a non-diagnostic reason?",
    options: [
      { label: "Yes — issue was investigated and resolved", next: "external_check" },
      { label: "No — duplicate of another ticket", result: "duplicate", type: "disposition" },
      { label: "No — cannot reproduce the issue", result: "cannot_repro", type: "disposition" },
      { label: "No — ticket was cancelled / no longer relevant", result: "cancelled", type: "disposition" },
    ],
  },
  {
    id: "external_check",
    question: "Was the root cause external to AOS?",
    subtitle: "Did the issue originate outside of AOS's systems and processes?",
    options: [
      { label: "Yes — caused by a media partner", result: "media_partner" },
      { label: "Yes — caused by the client, agency, or vendor", result: "client_vendor" },
      { label: "Yes — caused by the Operative platform", result: "operative" },
      { label: "No — the cause was internal or systemic", next: "actual_issue" },
    ],
  },
  {
    id: "actual_issue",
    question: "Was there actually a problem?",
    subtitle: "Or is the system behaving as designed?",
    options: [
      { label: "No problem — everything is working as expected", result: "expected" },
      { label: "Yes — there was a real issue", next: "issue_type" },
    ],
  },
  {
    id: "issue_type",
    question: "Where did the issue originate?",
    subtitle: "Think about the initial failure point, not the symptoms.",
    options: [
      { label: "Campaign was set up incorrectly (dates, targeting, pacing, etc.)", result: "trafficking" },
      { label: "The ad creative itself was broken or wrong", result: "creative" },
      { label: "A platform bug or system malfunction", result: "platform" },
      { label: "Numbers don't match between systems", next: "data_or_inventory" },
    ],
  },
  {
    id: "data_or_inventory",
    question: "Is this a measurement problem or a delivery problem?",
    subtitle: "Counting differently vs. not enough inventory.",
    options: [
      { label: "Systems are counting/reporting differently", result: "data" },
      { label: "Not enough inventory, oversold, or pacing failure", result: "inventory" },
      { label: "Actually, this was a process or handoff failure", result: "process" },
    ],
  },
];
