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
  'odoo-warehouse-management-built-in-vs-standalone-wms': {
    src: pexels('6169056'),
    alt: 'Warehouse team reviewing scanner-led picking, putaway flow, and storage decisions on the floor',
    caption: 'Warehouse fit should be tested through real receiving, putaway, scanning, and dispatch scenarios before customisation starts.',
  },
  'business-central-warehouse-management-standard-vs-standalone-wms': {
    src: pexels('6169056'),
    alt: 'Warehouse team reviewing bin layouts, replenishment flow, and system decisions in an aisle',
    caption: 'Warehouse software choices should be tested against real receiving, put-away, replenishment, and picking behaviour.',
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
  'netsuite-pricing-australia-licensing-modules-budget': {
    src: pexels('4386371'),
    alt: 'Finance lead reviewing ERP licensing, contract notes, and budget assumptions',
    caption: 'NetSuite budgeting works better when the quote is broken into platform, modules, services, and renewal exposure.',
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
  'how-to-run-erp-rfp': {
    src: pexels('3182773'),
    alt: 'Team reviewing proposal documents and selection criteria around a meeting table',
    caption: 'A good ERP RFP should create comparable answers and expose real delivery assumptions.',
  },
  'is-erp-rfp-really-required': {
    src: pexels('1181533'),
    alt: 'Business leaders deciding between formal procurement options in a planning meeting',
    caption: 'The right selection process depends on decision maturity, not procurement theatre.',
  },
  'industry-specific-erp-challenges-and-recommendations': {
    src: pexels('3183153'),
    alt: 'Cross-functional business team reviewing different operating models and industry needs',
    caption: 'Industry fit is really about operating pressure, controls, and process realities.',
  },
  'erp-customisations-governance-guide': {
    src: pexels('577585'),
    alt: 'Technical and business team reviewing system extensions and architecture decisions',
    caption: 'Customisation decisions need governance, ownership, and a clear support model after go-live.',
  },
  'managing-organisational-change-for-erp': {
    src: pexels('3184339'),
    alt: 'Team workshop focused on adoption planning, process change, and training',
    caption: 'ERP change lands better when leaders, managers, and users all know what changes for them.',
  },
  'what-is-an-erp-guide': {
    src: pexels('3184291'),
    alt: 'Business owners reviewing core operations and reporting on a shared table',
    caption: 'A good ERP introduction should connect software decisions back to real business control and growth needs.',
  },
  'spreadsheet-to-erp-migration-guide': {
    src: pexels('669610'),
    alt: 'Analyst comparing spreadsheet work with structured system data on screen',
    caption: 'The move from spreadsheets to ERP is really a move from informal workarounds to repeatable control.',
  },
  'first-time-erp-buyers-roadmap': {
    src: pexels('3182812'),
    alt: 'Leadership team building a first-time ERP shortlist and roadmap in a planning workshop',
    caption: 'First-time ERP buyers need a roadmap that keeps selection, partner choice, and change readiness in the right order.',
  },
  'erp-for-food-and-drink-manufacturing': {
    src: pexels('6169668'),
    alt: 'Food manufacturing leaders reviewing plant operations and traceability requirements',
    caption: 'Food and drink ERP decisions should start with plant control, traceability, quality, and reporting reality.',
  },
  'food-traceability-quality-and-recall-controls-in-erp': {
    src: pexels('4481259'),
    alt: 'Quality and production team reviewing traceability and recall controls in a processing environment',
    caption: 'Traceability and recall readiness should be tested as live operating controls, not treated as side features.',
  },
  'formulation-yield-and-batch-production-in-food-erp': {
    src: pexels('6169049'),
    alt: 'Food production team reviewing batch, yield, and formulation workflows',
    caption: 'Formulation, yield, and batch complexity need to be reflected in operations, warehouse execution, and finance together.',
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
  'myob-acumatica-vs-business-central': {
    src: pexels('3182812'),
    alt: 'Australian business team comparing ERP options in a structured workshop',
    caption: 'ANZ SMB comparisons should test local market fit, partner model, and ecosystem direction together.',
  },
  'odoo-vs-business-central': {
    src: pexels('5716032'),
    alt: 'Analyst comparing modular ERP and Microsoft-aligned ERP options on screen',
    caption: 'This decision is usually about governance and operating model as much as software cost.',
  },
  'odoo-vs-netsuite': {
    src: pexels('590022'),
    alt: 'Leadership team comparing flexible modular software with structured cloud ERP',
    caption: 'The real trade-off is flexibility versus standardised cloud operating discipline.',
  },
  'sage-intacct-vs-myob-acumatica': {
    src: pexels('36021621'),
    alt: 'Finance-led team reviewing ERP and reporting strategy choices',
    caption: 'Finance-led buyers need to decide whether depth in finance or broader ERP scope matters first.',
  },
  'generic-erp-vs-vertical-erp-food-manufacturers': {
    src: pexels('6169668'),
    alt: 'Food manufacturing team reviewing plant operations and traceability workflows',
    caption: 'Food-sector ERP fit depends on traceability, quality, and process reality more than generic feature breadth.',
  },
  'erp-for-meat-processing-generic-vs-specialist': {
    src: pexels('4481259'),
    alt: 'Processing plant team reviewing specialised production and compliance workflows',
    caption: 'Meat processing ERP choices should be tested against plant control, traceability, and yield management.',
  },
  'business-central-food-addons-vs-justfood': {
    src: pexels('6169049'),
    alt: 'Food operations leaders comparing Microsoft-based ERP and dedicated food ERP paths',
    caption: 'This decision turns on whether industry capability belongs in add-ons or in the core product.',
  },
  'odoo-manufacturing-smb-fit-analysis': {
    src: pexels('31352672'),
    alt: 'Manufacturing team evaluating flexible ERP fit on the shop floor',
    caption: 'Manufacturing buyers should test Odoo against planning discipline, reporting needs, and support model.',
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
  'business-central-payables-agent-australia-what-to-test': {
    src: pexels('6693655'),
    alt: 'Finance team reviewing invoices and AI-assisted payables workflow on laptops',
    caption: 'AP automation only creates value when mailbox flow, review controls, and finance ownership are designed properly.',
  },
  'business-central-payment-times-reporting-australia-february-2026': {
    src: pexels('6693655'),
    alt: 'Finance team reviewing payables controls and compliance reporting',
    caption: 'Australian localisation features still need finance ownership, supplier controls, and clean payables data.',
  },
  'business-central-sales-order-agent-australia-what-to-test': {
    src: pexels('6169659'),
    alt: 'Sales operations team reviewing customer order emails and quote workflow on screens',
    caption: 'Order-capture automation only works when mailbox design, stock logic, and review checkpoints are explicit.',
  },
  'business-central-2026-release-wave-1-australia-priorities': {
    src: pexels('5716032'),
    alt: 'ERP leadership team reviewing release priorities, AI workflows, and operating decisions',
    caption: 'Release-wave value comes from choosing the few changes that improve control or throughput in the real operating model.',
  },
  'warehouse-kpis-that-tell-you-when-erp-needs-wms': {
    src: pexels('6169056'),
    alt: 'Warehouse leaders reviewing handheld workflows and stock movement decisions in an aisle',
    caption: 'Warehouse KPI trends should separate genuine WMS need from issues that still belong to process and data cleanup.',
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
  'why-generic-erp-demos-miss-food-manufacturing-reality': {
    src: pexels('6169668'),
    alt: 'Food manufacturing team challenging a generic ERP demo against plant realities',
    caption: 'Generic demos often miss the exception-heavy workflows that matter most in food manufacturing.',
  },
  'food-erp-projects-scope-warehouse-quality-and-production-together': {
    src: pexels('6169056'),
    alt: 'Warehouse, quality, and production teams aligning one operating workflow',
    caption: 'Food ERP design is safer when warehouse, quality, and production are scoped as one control model.',
  },
  'erp-checklist-for-beverage-manufacturers': {
    src: pexels('5946975'),
    alt: 'Beverage manufacturing team reviewing batch control and packaging requirements',
    caption: 'Beverage ERP selection should test packaging, batch status, planning, and reporting under real operating pressure.',
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
