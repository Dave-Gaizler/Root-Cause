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
    question: "How was the ticket closed?",
    subtitle: "Select the option that best describes the outcome.",
    options: [
      { label: "Yes — issue was investigated and resolved", next: "external_check" },
      { label: "No — duplicate of another ticket", result: "duplicate", type: "disposition" },
      { label: "No — cannot reproduce the issue", result: "cannot_repro", type: "disposition" },
      { label: "No — ticket was cancelled / no longer relevant", result: "cancelled", type: "disposition" },
    ],
  },
  {
    id: "external_check",
    question: "Where did the issue originate?",
    subtitle: "Select the party responsible for the root cause.",
    options: [
      { label: "External — caused by a media partner", result: "media_partner" },
      { label: "External — caused by the client, agency, or vendor", result: "client_vendor" },
      { label: "External — caused by the Operative platform", result: "operative" },
      { label: "Internal — the cause was within AOS", next: "actual_issue" },
    ],
  },
  {
    id: "actual_issue",
    question: "Was there a real problem?",
    subtitle: "Consider whether the system behaved as designed.",
    options: [
      { label: "No — everything is working as expected", result: "expected" },
      { label: "Yes — there was a real issue", next: "issue_type" },
    ],
  },
  {
    id: "issue_type",
    question: "What type of issue was it?",
    subtitle: "Focus on the initial failure point, not the symptoms.",
    options: [
      { label: "Campaign was set up incorrectly (dates, targeting, pacing, etc.)", result: "trafficking" },
      { label: "The ad creative itself was broken or wrong", result: "creative" },
      { label: "A platform bug or system malfunction", result: "platform" },
      { label: "Numbers don't match between systems", next: "data_or_inventory" },
    ],
  },
  {
    id: "data_or_inventory",
    question: "What kind of discrepancy was it?",
    subtitle: "Choose the closest match to the underlying failure.",
    options: [
      { label: "Systems are counting or reporting differently", result: "data" },
      { label: "Not enough inventory, oversold, or pacing failure", result: "inventory" },
      { label: "A process or handoff failure", result: "process" },
    ],
  },
];
