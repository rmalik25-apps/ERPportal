type Visual = {
  src: string
  alt: string
  caption: string
}

const pexels = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

const fallbackGuideVisual: Visual = {
  src: pexels('3184328'),
  alt: 'Team reviewing implementation plans and checklists',
  caption: 'Use this guide to plan your ERP scope before demos, proposals, and delivery workshops.',
}

const fallbackComparisonVisual: Visual = {
  src: pexels('590022'),
  alt: 'Side-by-side analytics screens for software comparison',
  caption: 'Use this comparison to pressure-test platform fit before shortlisting partners.',
}

const fallbackBlogVisual: Visual = {
  src: pexels('3183150'),
  alt: 'Business discussion around digital transformation and operations',
  caption: 'A practical perspective for operators and finance teams evaluating ERP change.',
}

export const pageVisuals = {
  home: {
    src: '/hero-erp-brief.svg',
    alt: 'ERP planning workspace with dashboards and team notes',
  },
  guides: {
    src: fallbackGuideVisual.src,
    alt: fallbackGuideVisual.alt,
  },
  comparisons: {
    src: fallbackComparisonVisual.src,
    alt: fallbackComparisonVisual.alt,
  },
  blog: {
    src: fallbackBlogVisual.src,
    alt: fallbackBlogVisual.alt,
  },
  privacy: {
    src: pexels('5380655'),
    alt: 'Secure data and compliance concept with lock and documents',
  },
  disclosure: {
    src: pexels('6694543'),
    alt: 'Professional handover of contract documents across a desk',
  },
} as const

const guideVisualsBySlug: Record<string, Visual> = {
  'erp-selection-checklist-smb': {
    src: pexels('8279300'),
    alt: 'Business team using sticky notes to shortlist options on a planning wall',
    caption: 'Selection work is strongest when requirements, risks, and evaluation criteria are visible to the whole team.',
  },
  'navision-to-business-central-migration': {
    src: pexels('7947758'),
    alt: 'Consultants reviewing system migration steps on laptops in a workshop',
    caption: 'Migration planning should align technical steps, data quality, testing, and cutover ownership.',
  },
  'business-central-implementation-wholesale-distribution': {
    src: pexels('4483942'),
    alt: 'Warehouse team using tablets and laptops around stock shelving',
    caption: 'Distribution projects succeed when warehouse process design is treated as core scope, not a later fix.',
  },
  'business-central-manufacturing-mrp-shop-floor': {
    src: pexels('31352672'),
    alt: 'Manufacturing operators and engineers reviewing shop floor information',
    caption: 'Manufacturing ERP design needs realistic conversations about planning signals, lead times, and execution discipline.',
  },
  'd365-sales-business-central-integration-guide': {
    src: pexels('3184465'),
    alt: 'Sales and operations staff reviewing pipeline and order workflow on screens',
    caption: 'CRM and ERP integration should support clean handovers from opportunity to order and fulfilment.',
  },
  'how-to-choose-erp-implementation-partner': {
    src: pexels('1181406'),
    alt: 'Senior team interviewing a consulting partner across a meeting table',
    caption: 'Partner selection is not just about rate cards; it is about delivery method, fit, and governance maturity.',
  },
  'erp-finance-design-chart-accounts-dimensions': {
    src: pexels('36021621'),
    alt: 'Finance professional reviewing reports and ledger structures on a laptop',
    caption: 'Finance design choices shape management reporting, approval flows, and how much manual work survives go-live.',
  },
  'erp-data-migration-playbook-clean-cutover': {
    src: pexels('669615'),
    alt: 'Analysts cleaning and validating structured data on screens',
    caption: 'Data migration is a business ownership exercise as much as a technical one.',
  },
  'erp-governance-owner-led-family-businesses': {
    src: pexels('3184465'),
    alt: 'Leadership team making decisions in a practical planning session',
    caption: 'Owner-led businesses move faster when decision rights and escalation paths are explicit from the start.',
  },
  'warehouse-process-redesign-before-erp-go-live': {
    src: pexels('6169056'),
    alt: 'Warehouse staff checking picking and storage processes in an aisle',
    caption: 'Before go-live, warehouse process redesign should remove workarounds rather than automate them.',
  },
  'multi-entity-erp-setup-growing-business-groups': {
    src: pexels('3183153'),
    alt: 'Finance and operations team coordinating across multiple business units',
    caption: 'Multi-entity design needs consistency in controls and enough flexibility for local operating differences.',
  },
  'pricing-margin-control-framework-business-central': {
    src: pexels('210990'),
    alt: 'Commercial analyst reviewing pricing and margin dashboards',
    caption: 'Margin control frameworks work best when pricing rules, approvals, and exception reporting are connected.',
  },
  'post-go-live-stabilisation-plan-first-90-days': {
    src: pexels('3184339'),
    alt: 'Project team running a post-launch review around laptops and notes',
    caption: 'The first 90 days should focus on stabilisation priorities, not a backlog of nice-to-have changes.',
  },
  'erp-security-access-controls-smb-organisations': {
    src: pexels('5380642'),
    alt: 'Cybersecurity concept with secure access and digital controls',
    caption: 'Access design should be built into the ERP programme early enough to survive real operating pressure.',
  },
  'when-to-customise-erp-vs-keep-spreadsheets': {
    src: pexels('590022'),
    alt: 'Professional comparing dashboards and spreadsheet workflows side by side',
    caption: 'Not every spreadsheet should be replaced, but every important workflow should have an owner and a decision rationale.',
  },
}

const comparisonVisualsBySlug: Record<string, Visual> = {
  'business-central-vs-netsuite-growing-businesses': {
    src: pexels('3183153'),
    alt: 'Leadership team comparing software options and growth scenarios',
    caption: 'Growth-stage ERP comparisons should look beyond features and test operating model fit.',
  },
  'business-central-vs-acumatica-distribution-project-services': {
    src: pexels('4483610'),
    alt: 'Operations team comparing fulfilment and services workflows on laptops',
    caption: 'Fit-first comparisons work best when the business can see how each platform handles real operational complexity.',
  },
  'business-central-vs-sap-business-one-fit-analysis': {
    src: pexels('5716032'),
    alt: 'Analyst comparing software dashboards and implementation notes',
    caption: 'Software selection should compare functional fit, reporting model, and implementation overhead together.',
  },
  'netsuite-vs-sage-intacct-finance-first-teams': {
    src: pexels('36021621'),
    alt: 'Finance team reviewing reporting and close process requirements',
    caption: 'Finance-first teams need to compare reporting control, consolidation needs, and the cost of operational depth.',
  },
  'integrated-erp-crm-vs-best-of-breed-stack': {
    src: pexels('3184465'),
    alt: 'Commercial and operations team debating integrated systems versus separate tools',
    caption: 'The real choice is not integration versus independence; it is where you want process friction to live.',
  },
  'nav-technical-upgrade-vs-full-reimplementation': {
    src: pexels('7947758'),
    alt: 'Migration team reviewing upgrade and reimplementation paths on a whiteboard',
    caption: 'Legacy ERP decisions need an honest view of customisation debt, process drift, and data quality.',
  },
}

const blogVisualsBySlug: Record<string, Visual> = {
  'seven-erp-red-flags-distributors-before-contract-signing': {
    src: pexels('6169056'),
    alt: 'Warehouse and supply chain team reviewing fulfilment issues before a software decision',
    caption: 'Distribution buyers should look for warning signs in process coverage, picking flow, and inventory discipline.',
  },
  'manufacturing-erp-kpi-pack-before-go-live': {
    src: pexels('31352672'),
    alt: 'Manufacturing leadership reviewing KPI dashboards and production information',
    caption: 'A good pre-go-live KPI pack tells teams what to watch before small issues become operational failures.',
  },
  'erp-priorities-professional-services-project-firms': {
    src: pexels('3184433'),
    alt: 'Professional services team planning projects and utilisation in a meeting room',
    caption: 'Project-based firms need ERP design choices that respect utilisation, margin, billing, and resource planning.',
  },
  'retail-erp-omnichannel-stock-accuracy-margin-controls': {
    src: pexels('14458537'),
    alt: 'Retail staff managing stock visibility and store operations',
    caption: 'Retail ERP value usually shows up in inventory accuracy, replenishment confidence, and margin visibility.',
  },
  'review-business-central-release-notes-without-project-churn': {
    src: pexels('5716032'),
    alt: 'Project manager reviewing release notes and backlog decisions on screen',
    caption: 'Release management works best when updates are triaged against business value and regression risk.',
  },
  'where-d365-sales-to-erp-handovers-usually-break': {
    src: pexels('3184465'),
    alt: 'Sales and operations teams aligning customer handover workflow',
    caption: 'Handovers break when ownership is fuzzy between pipeline, order entry, delivery, and finance.',
  },
  'phased-rollout-vs-big-bang-erp-go-live': {
    src: pexels('8279300'),
    alt: 'Programme team sequencing delivery stages on a planning wall',
    caption: 'Rollout strategy should reflect operational risk, team readiness, and the cost of parallel complexity.',
  },
  'change-management-that-works-smb-erp-programmes': {
    src: pexels('3184339'),
    alt: 'Team workshop focused on adoption planning and process change',
    caption: 'Adoption comes from role-based support, visible sponsors, and practical operating changes.',
  },
  'month-end-close-new-erp-first-three-cycles-playbook': {
    src: pexels('6693655'),
    alt: 'Finance team preparing month-end close tasks and reconciliations',
    caption: 'The first close cycles should focus on rhythm, ownership, and variance resolution speed.',
  },
  'integration-architecture-essentials-smb-erp-landscapes': {
    src: pexels('577585'),
    alt: 'Technical team mapping integrations and systems architecture',
    caption: 'Integration discipline is less about tools and more about ownership, observability, and failure handling.',
  },
  'vendor-demo-script-erp-buyers-what-to-ask': {
    src: pexels('1181406'),
    alt: 'Buyer team running a structured software demo with a vendor',
    caption: 'Strong demo scripts focus vendors on your process risk instead of polished generic workflows.',
  },
  'implementation-partner-due-diligence-ten-questions': {
    src: pexels('3182812'),
    alt: 'Procurement and delivery team conducting due diligence with a consulting partner',
    caption: 'Due diligence should test who will really deliver the work, not just who sold the proposal.',
  },
  'data-quality-ownership-model-erp-programmes': {
    src: pexels('669615'),
    alt: 'Data stewards validating records and governance standards on screens',
    caption: 'Data quality improves when ownership moves from abstract policy into named business roles.',
  },
  'erp-licensing-and-support-cost-control-growing-organisations': {
    src: pexels('4386371'),
    alt: 'Finance manager reviewing software costs, contracts, and support line items',
    caption: 'Licence and support costs are easier to control when access, environments, and support scope are governed.',
  },
  'from-project-to-bau-setting-erp-improvement-roadmap': {
    src: pexels('3183153'),
    alt: 'Leadership team prioritising continuous improvement after an ERP project',
    caption: 'The move from project to BAU is where improvement discipline and ownership either harden or drift.',
  },
}

export function getGuideVisual(slug?: string) {
  if (!slug) return fallbackGuideVisual
  return guideVisualsBySlug[slug] || fallbackGuideVisual
}

export function getComparisonVisual(slug?: string) {
  if (!slug) return fallbackComparisonVisual
  return comparisonVisualsBySlug[slug] || fallbackComparisonVisual
}

export function getBlogVisual(slug?: string) {
  if (!slug) return fallbackBlogVisual
  return blogVisualsBySlug[slug] || fallbackBlogVisual
}

