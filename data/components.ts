export interface ComponentItem {
  name: string;
  definition: string;
  issueTypes: string[];
}

export interface ComponentGroup {
  name: string;
  color: string;
  items: ComponentItem[];
}

export const componentGroups: ComponentGroup[] = [
  {
    name: "Targeting",
    color: "#6366f1",
    items: [
      { name: "Targeting: Inventory", definition: "Incorrect inventory targeting applied (e.g., wrong ad units, placements)", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Targeting: Geo", definition: "Incorrect geographic targeting applied", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Targeting: Device", definition: "Incorrect device targeting applied (mobile, desktop, CTV, etc.)", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Targeting: Custom", definition: "Incorrect custom/audience targeting applied (key-values, segments)", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Targeting: Video Position", definition: "Incorrect or missing video position targeting (pre-roll, mid-roll, post-roll)", issueTypes: ["Delivery", "Live Site"] },
      { name: "Targeting: Presets", definition: "Incorrect preset appended / Issues with presets", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
    ],
  },
  {
    name: "Creative",
    color: "#8b5cf6",
    items: [
      { name: "Creative: Unapproved/Inactive", definition: "Creative was not approved/active or is out of tech specs", issueTypes: ["Delivery", "Live Site"] },
      { name: "Creative: Incorrect Size", definition: "Creatives trafficked to wrong size (e.g., YT 480x360 vs 480x361)", issueTypes: ["Delivery", "Live Site"] },
      { name: "Creative: Incorrect Setup", definition: "Creative was set up incorrectly (catch-all for creative config errors not covered above)", issueTypes: ["Delivery", "Live Site"] },
      { name: "Creative: Transcoding Issue", definition: "Video creative transcoding failure or quality degradation", issueTypes: ["Delivery", "Live Site"] },
    ],
  },
  {
    name: "Tag",
    color: "#14b8a6",
    items: [
      { name: "Tag: Implementation Issue", definition: "Tag not properly appended — wrong position, macro, cachebuster, or other setup error", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Tag: Backend XML Issue", definition: "Issue with backend components in tag XML structure", issueTypes: ["Delivery"] },
      { name: "Tag: Unapproved", definition: "Unapproved tag appended to the line item", issueTypes: ["Delivery", "Int/Ext Reporting"] },
    ],
  },
  {
    name: "Setup",
    color: "#f59e0b",
    items: [
      { name: "Setup: Incorrect Date/Time/Blackouts", definition: "Start or end dates/times are incorrect in ad server, or blackout dates applied/not applied per client agreement", issueTypes: ["Delivery", "Int/Ext Reporting", "Live Site"] },
      { name: "Setup: Frequency Cap", definition: "Incorrect frequency cap was set", issueTypes: ["Delivery", "Live Site"] },
      { name: "Setup: Priority", definition: "Incorrect priority was set in MC/GAM", issueTypes: ["Delivery"] },
      { name: "Setup: Secondary Pacing", definition: "Secondary pacing/line item scheduling applied or not applied per client agreement", issueTypes: ["Delivery"] },
      { name: "Setup: Double Booking", definition: "Campaigns double booked causing undesired shared inventory or ad experience", issueTypes: ["Delivery", "Live Site"] },
      { name: "Setup: Frontload", definition: "Frontload configuration error", issueTypes: ["Delivery"] },
    ],
  },
  {
    name: "Reporting",
    color: "#ec4899",
    items: [
      { name: "Reporting: Missing/Incorrect Data", definition: "Relevant reporting missing or incorrect from JIRA ticket, or timezone issues", issueTypes: ["Int/Ext Reporting"] },
      { name: "Reporting: Data Delay", definition: "Reporting data delayed beyond expected timeframe", issueTypes: ["Int/Ext Reporting"] },
      { name: "Reporting: Ad Server Logic", definition: "nCPM calculation or duration limits, or other ad server logic causing reporting issues", issueTypes: ["Int/Ext Reporting"] },
      { name: "Reporting: Asset Tag", definition: "Asset tag for creatives incorrect (e.g., conflicting with IRM rules), causing reporting issues", issueTypes: ["Int/Ext Reporting", "Delivery"] },
    ],
  },
  {
    name: "Ticket",
    color: "#f97316",
    items: [
      { name: "Ticket: Unsupported Escalation", definition: "AM submitted escalation that AOS does not support (e.g., issues outside MC/GAM)", issueTypes: ["All"] },
      { name: "Ticket: Known Issue Re-Escalated", definition: "Issue was escalated after a known-issue communication had already been sent", issueTypes: ["All"] },
      { name: "Ticket: Incorrect Type", definition: "AM filed ticket in wrong category (e.g., reporting ticket that's actually delivery)", issueTypes: ["All"] },
      { name: "Ticket: Incorrect JIRA Project", definition: "AM submitted escalation in wrong JIRA project (e.g., AOS instead of SysAdmin)", issueTypes: ["All"] },
      { name: "Ticket: Incorrect Link", definition: "AM provided incorrect link (e.g., CR link instead of shareable MC link)", issueTypes: ["All"] },
      { name: "Ticket: Missing Tag Sheet", definition: "AM did not provide tag sheet", issueTypes: ["Delivery", "Int/Ext Reporting"] },
      { name: "Ticket: Incomplete Template", definition: "AM did not provide sufficient information in initial ticket or did not use JIRA template", issueTypes: ["All"] },
      { name: "Ticket: Missing AM Updates", definition: "AM failed to provide further updates needed for troubleshooting", issueTypes: ["All"] },
      { name: "Ticket: AM Incorrectly Closed", definition: "AM incorrectly closed ticket", issueTypes: ["All"] },
      { name: "Ticket: AM Self-Resolved", definition: "AM figured out the issue themselves (use alongside actual error component if identifiable)", issueTypes: ["All"] },
    ],
  },
  {
    name: "Platform",
    color: "#ef4444",
    items: [
      { name: "Platform: Buffer", definition: "Infrequent or frequent changes to the buffer affecting delivery or Buffer Automation (e.g., Nielsen DTA demo)", issueTypes: ["Platform Bug", "Delivery"] },
      { name: "Platform: Screenshot/Context", definition: "Screenshot evidence is missing from the JIRA ticket for platform bug verification", issueTypes: ["All"] },
    ],
  },
  {
    name: "Ad Experience",
    color: "#3b82f6",
    items: [
      { name: "Ad Experience: Misplacement", definition: "Ad appearing in wrong position, slot, or context on the page", issueTypes: ["Ad Experience", "Live Site"] },
      { name: "Ad Experience: User-Facing Bug", definition: "Ad rendering, interaction, or display issue visible to end users", issueTypes: ["Ad Experience", "Live Site"] },
      { name: "Ad Experience: Quality Violation", definition: "Ad violates quality standards — intrusive, auto-playing audio, excessive load time, etc.", issueTypes: ["Ad Experience", "Live Site"] },
    ],
  },
];
