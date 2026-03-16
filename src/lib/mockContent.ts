import type {ComparisonDoc, GuideDoc, PostDoc} from './types'

const introBlocks = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: 'block' as const,
    _key: `b${i}`,
    style: 'normal',
    children: [{_type: 'span' as const, text}],
  }))

const skimmableBlocks = (...sections: string[][]) => introBlocks(sections.flat())

const detailedGuideBlocks = (intent: string, leadParagraphs: string[]) => {
  const commonBullets = [
    'Document success metrics, owner accountabilities, and a realistic sequencing plan across finance, operations, and technology teams before committing budget.',
    'Use a weekly risk review with named owners, due dates, and mitigation actions so scope discussions do not restart every fortnight.',
    'Treat the guide as a working playbook and use it in steering meetings, partner workshops, and stage-gate reviews rather than leaving it as background reading.',
  ]

  const commonPitfalls = [
    'Selecting software before agreeing the future operating model and decision criteria.',
    'Allowing one department to dominate the design while finance, operations, and IT assumptions remain untested.',
    'Using generic demos and partner promises instead of evidence from real scenarios, real data, and real reporting needs.',
  ]

  const byIntent: Record<string, string[]> = {
    Selection: [
      'Define the top five business outcomes first, then test whether each vendor can support those outcomes with standard functionality or acceptable configuration.',
      'Run scenario-led demos with your own transactions and edge cases, then score each scenario against usability, control quality, reporting quality, and process fit.',
      'Split commercial evaluation into software cost, implementation cost, and support model so low entry pricing does not hide delivery risk.',
      'Set a final decision gate that includes business sponsor sign-off, architecture sign-off, and procurement sign-off.',
    ],
    Migration: [
      'Start with a technical and business discovery phase that identifies extensions, reports, integrations, and manual controls carried by the legacy system.',
      'Build migration waves around business risk, not module labels, with finance close, order fulfilment, and purchasing controls as non-negotiable release criteria.',
      'Use at least two end-to-end cutover rehearsals with timed runbooks, rollback criteria, and named decision owners.',
      'Post-migration, schedule a stabilisation period with daily triage and explicit defect classification so business continuity remains protected.',
    ],
    Implementation: [
      'Treat process design workshops as decision workshops, not discovery sessions, and close each workshop with approved process choices and logged gaps.',
      'Confirm master data standards early, including ownership, validation rules, and maintenance cadence.',
      'Build training around real roles and real transactions because generic walkthroughs rarely produce strong adoption at go-live.',
      'Track readiness by process area and site, not by overall percentage complete, so leadership can see practical launch risk.',
    ],
    Manufacturing: [
      'Validate planning assumptions using recent production history because unrealistic lead times or routing standards will generate unusable planning outputs.',
      'Align procurement, planning, and production supervision around one weekly planning cadence to avoid contradictory execution signals.',
      'Set control points for BOM governance, engineering change management, and scrap reporting before introducing advanced automation.',
      'Pilot with one value stream and review service, WIP, and schedule adherence before scaling to additional plants or lines.',
    ],
    'CRM + ERP': [
      'Define handover criteria from opportunity to quote to order. This avoids data ambiguity and commercial leakage between sales and operations.',
      'Limit synchronisation to high-value fields with clear ownership. More integration is not always better integration.',
      'Design exception queues and escalation paths so users can recover failed synchronisations without technical intervention.',
      'Review integration health weekly during launch months, including duplicate rates, failed records, and turnaround times.',
    ],
    'Partner Selection': [
      'Ask who will deliver the programme day-to-day and request role continuity commitments in writing.',
      'Evaluate scope assumptions line by line, including explicit exclusions, data migration effort, and testing responsibilities.',
      'Run reference calls with businesses that match your industry and complexity profile, not only size.',
      'Define governance cadence, escalation thresholds, and commercial change controls before contract signature.',
    ],
    Finance: [
      'Build reporting prototypes with real management questions before finalising account and dimension structures.',
      'Use a clear policy for when to add dimensions, when to add accounts, and when to redesign source processes.',
      'Protect month-end with controlled journals, segregation of duties, and reconciliation ownership by domain.',
      'Test close performance in user acceptance testing, not only after go-live.',
    ],
    'Data Migration': [
      'Create domain owners for customer, supplier, item, and finance data, each with measurable quality thresholds.',
      'Run migration cycles with fixed reconciliation checkpoints and sign-off criteria per data domain.',
      'Track defects by root cause category so the team fixes source problems instead of repeating cleansing work.',
      'Freeze critical structures at the right time to balance stability with late business changes.',
    ],
    Governance: [
      'Set clear decision rights across sponsors, process owners, and project delivery leads. Ambiguity here causes avoidable delays.',
      'Separate strategic steering decisions from daily delivery decisions. Keep both forums regular and outcome-focused.',
      'Maintain one integrated RAID register so budget, scope, and operational risks are visible together.',
      'Use stage-gate criteria with evidence requirements before releasing further investment.',
    ],
    Operations: [
      'Map current and future workflows side by side, then quantify expected improvements before design sign-off.',
      'Define operational KPIs and target levels before build completion so go-live support has clear priorities.',
      'Train floor leaders first and equip them with daily checklists for receiving, picking, packing, and stock adjustments.',
      'After go-live, run a daily operations huddle to resolve exceptions quickly and protect service levels.',
    ],
    'Multi-entity': [
      'Decide which processes must be standardised group-wide and which can remain entity-specific due to legal or market constraints.',
      'Establish shared-service boundaries for finance, procurement, and master data governance early in design.',
      'Design intercompany processes with explicit timing and reconciliation ownership to avoid period-end bottlenecks.',
      'Roll out in waves with entity readiness criteria covering data, controls, and local team capability.',
    ],
    Commercial: [
      'Define pricing governance rules by product, customer segment, and approval threshold before go-live.',
      'Implement margin monitoring at transaction level for high-risk segments during the first months.',
      'Create exception workflows that balance commercial agility with gross margin protection.',
      'Review discount behaviour trends monthly and adjust policy where leakage appears.',
    ],
    'Post Go-live': [
      'Set up a command-centre model for the first weeks with named leads for finance, operations, integrations, and support triage.',
      'Categorise incidents by business impact and track restoration times to maintain confidence with stakeholders.',
      'Move from hypercare to continuous improvement only when control metrics are stable across at least two reporting cycles.',
      'Publish a 90-day improvement backlog prioritised by business value, risk reduction, and delivery effort.',
    ],
    Security: [
      'Map roles to process responsibilities and enforce least-privilege access from day one.',
      'Focus segregation controls on payment approvals, supplier banking changes, credit overrides, and master data administration.',
      'Run quarterly access reviews with business owners and require documented remediation of exceptions.',
      'Include security regression checks in every release cycle to prevent control drift.',
    ],
    Architecture: [
      'Assess each customisation request against value, process stability, upgrade impact, and support overhead.',
      'Keep a formal design authority to approve extensions and retire low-value bespoke logic over time.',
      'Where spreadsheets remain, define ownership, control checks, and reconciliation points clearly.',
      'Review the extension portfolio every quarter to maintain system simplicity and upgrade readiness.',
    ],
  }

  return skimmableBlocks(
    leadParagraphs,
    ['## Why this guide matters'],
    [
      `• ${leadParagraphs[0] || 'ERP decisions carry operational and commercial consequences well beyond software fit.'}`,
      `• ${leadParagraphs[1] || 'Teams need a shared decision framework before they commit budget or partner time.'}`,
      `• ${leadParagraphs[2] || 'A stronger upfront process reduces rework, design churn, and avoidable programme risk.'}`,
    ],
    ['## What a good approach looks like'],
    (byIntent[intent] || []).map((item) => `• ${item}`),
    ['## Common mistakes to avoid'],
    commonPitfalls.map((item) => `• ${item}`),
    ['## Practical next steps'],
    commonBullets.map((item) => `• ${item}`),
  )
}

const detailedComparisonBlocks = (
  comparisonType: string,
  leadParagraphs: string[],
  leftProduct: string,
  rightProduct: string,
) => {
  const common = [
    `A strong shortlist decision should test ${leftProduct} and ${rightProduct} against the same operating scenarios, governance expectations, and implementation constraints.`,
    'The product that looks better in a demo can still be the worse choice once partner capability, data migration effort, and operating discipline are considered.',
    'Before final selection, ask each vendor or partner to walk through your target state processes, key reporting requirements, and the top three reasons the implementation could go off track.',
  ]

  const byType: Record<string, string[]> = {
    erpPlatform: [
      `Start by clarifying whether the business needs a finance-led platform choice, an operations-led platform choice, or a balanced design. ${leftProduct} and ${rightProduct} may both be viable, but they usually win for different reasons.`,
      `Assess functional fit in the areas that drive daily control: month-end close, purchasing, inventory, fulfilment, project tracking, intercompany handling, and reporting. Avoid turning the decision into a giant features matrix with no weighting.`,
      'Evaluate the likely implementation shape for each option. One platform may appear cheaper in software terms while carrying more delivery risk because of process redesign, partner scarcity, or custom integration work.',
      'Model the first 18 months, not just software subscription. Include implementation, change management, support, training, reporting build, and the likely cost of enhancements that are postponed from phase one.',
      'The final decision should include three explicit outputs: which processes fit cleanly, which compromises are acceptable, and which operating constraints will remain after go-live.',
    ],
    financeFirst: [
      'Finance-first teams should anchor the comparison around period-end close, multi-entity visibility, approval controls, consolidation, budgeting, and reporting flexibility. Those areas usually matter more than broad module count in the early selection phase.',
      `With ${leftProduct}, the question is often whether the broader ERP footprint is needed now or whether it creates complexity before the business is ready to absorb it. With ${rightProduct}, the question is often whether a finance-led deployment will later need too many adjacent systems to cover operations.`,
      'Probe practical close-day questions: how journals are controlled, where reconciliations live, how approval workflows behave, and how management packs are produced without spreadsheet sprawl.',
      'Ask implementation partners to show a realistic finance operating model, including chart design, dimensions, intercompany treatment, and reporting ownership. That matters more than polished generic finance demos.',
      'If the business expects to expand entities, geographies, or revenue models within the next two years, factor that trajectory into the decision now rather than assuming a later re-platform will be easy.',
    ],
    stackStrategy: [
      'This decision is usually less about feature quality and more about operating simplicity versus flexibility. A unified stack can reduce governance overhead, while a best-of-breed model can preserve specialist process depth at the cost of more integration and control work.',
      'Assess who will own the cross-system design. If no clear business and technical owners exist, a fragmented stack can quickly become a service and reporting problem.',
      'Map the customer, quote, order, invoice, and support journey end to end. Any design that leaves ownership ambiguous between systems will create operational leakage.',
      'The right answer depends on how much process variation the business really needs, and whether the internal team can support a more distributed application landscape.',
    ],
    migrationStrategy: [
      'This comparison should start with business intent, not technical preference. If the business wants a cleaner process model, master data reset, or control redesign, a full reimplementation may be the more honest path even if the technical team prefers an upgrade.',
      'Run an inventory of customisations, reports, integrations, and manual workarounds. That inventory determines whether the legacy estate is still manageable or whether it is carrying too much hidden complexity.',
      'Evaluate the cost of preserving old design decisions. A technical upgrade can appear safer but may preserve poor process, obsolete controls, and hard-to-support extension logic.',
      'Ask what the business will gain after go-live in each path. If the answer is only “same process on newer technology”, that may not justify the delivery effort.',
    ],
  }

  return skimmableBlocks(
    leadParagraphs,
    ['## What to compare first'],
    (byType[comparisonType] || []).map((item) => `• ${item}`),
    ['## Questions to ask before shortlisting'],
    common.map((item) => `• ${item}`),
  )
}

const detailedPostBlocks = (category: string, leadParagraphs: string[]) => {
  const byCategory: Record<string, string[]> = {
    Distribution: [
      'Look closely at warehouse-directed processes such as receiving, put-away, replenishment, picking, and dispatch because they expose whether the proposed design fits real floor behaviour.',
      'Ask how item substitutions, backorders, landed cost, lot control, and customer-specific pricing will be handled in day-to-day operations.',
      'Challenge any implementation plan that leaves barcode, warehouse layout, or master data policy until late in the project.',
    ],
    Manufacturing: [
      'Focus on whether the ERP design will improve planning discipline, production visibility, and inventory integrity rather than simply digitising existing bad habits.',
      'Make planners, production supervisors, and finance leads jointly responsible for the KPI pack so operational improvement is measured from several angles.',
      'Use the KPI baseline to decide which plants, product families, or work centres need additional support during rollout.',
    ],
    'Professional Services': [
      'Project-based firms usually need one joined-up view of pipeline, resourcing, delivery, billing, and margin. If those hand-offs sit in too many disconnected tools, leakage appears quickly.',
      'Timesheet capture, approval speed, work-in-progress visibility, milestone billing, and revenue recognition rules should be treated as core selection criteria rather than back-office details.',
      'Partner demos should show how project managers, finance, and client-facing leaders each use the system during a live project lifecycle.',
    ],
    Retail: [
      'Retail buyers should test how the system behaves when stock is wrong, promotions overlap, returns spike, or stores and online channels compete for the same inventory.',
      'Margin control depends on discipline around pricing rules, markdown governance, and exception reporting as much as it depends on software capability.',
      'A practical retail ERP rollout prioritises clean item data, strong stocktake routines, and dependable fulfilment before advanced analytics.',
    ],
    'Business Central': [
      'Release reviews should be tied to risk and value, not novelty. Many updates are worth observing first before committing time to adoption.',
      'Create a repeatable filter that sorts new features into immediate value, monitor only, partner validation required, or defer.',
      'Business process owners should be involved in the review so technical impact and operating impact are considered together.',
    ],
    'CRM + ERP': [
      'Most problems sit at the boundaries: quote approval, customer master quality, pricing integrity, order conversion, and exception handling.',
      'Design handovers around named owners and agreed checkpoints instead of hoping synchronisation alone will keep both systems aligned.',
      'The best operating model is the one that makes breakpoints visible early and gives teams a practical way to recover.',
    ],
    'Delivery Strategy': [
      'The rollout shape should reflect business resilience, leadership bandwidth, and integration complexity rather than internal preference for “speed” or “safety”.',
      'A phased model needs stronger interim controls, clear scope boundaries, and discipline about what stays in legacy during transition.',
      'A big-bang model requires deeper rehearsal, firmer cutover governance, and less tolerance for unresolved process ambiguity.',
    ],
    'Change Management': [
      'Smaller organisations often believe communication can stay informal. In practice, ERP change still needs structure so people know what is changing, when, and what support exists.',
      'Manager-led reinforcement after go-live matters more than polished training decks because teams revert to old habits under pressure.',
      'Useful adoption tracking looks at transaction quality, exception rates, rework, and help needed by role, not just attendance sheets.',
    ],
    Finance: [
      'The first three close cycles should be treated as a controlled operating programme with daily rhythm, visible issue triage, and close ownership by domain.',
      'Reconciliations, journals, allocations, and approvals should each have named owners and time targets so the business can spot where the new process is breaking down.',
      'A calm first close builds credibility with leadership far faster than a long list of future-state improvements.',
    ],
    Architecture: [
      'Integration quality is measured by recoverability, observability, and ownership, not just by whether messages move between systems.',
      'Every integration should have an owner, a support path, and a clear definition of source-of-truth objects.',
      'If the business cannot tell when an integration fails or who fixes it, the design is not production-ready.',
    ],
    Selection: [
      'ERP demos are most valuable when vendors are forced to walk through your messy, real-world exceptions instead of their clean scripted flows.',
      'A good demo script creates comparable evidence across vendors and prevents teams being swayed by presentation style alone.',
      'Capture assumptions live during the session so each claimed capability can be verified later in scope and commercials.',
    ],
    'Partner Selection': [
      'Partner due diligence should test delivery reality: who will lead, who will configure, who will govern, and what happens when scope assumptions fail.',
      'Reference calls are useful only when they match your complexity, industry pressures, and leadership style.',
      'Commercial discipline matters as much as technical skill because unclear change control is one of the fastest ways to lose trust mid-project.',
    ],
    Data: [
      'Data quality improves when ownership is attached to business outcomes such as credit accuracy, inventory trust, supplier readiness, and reporting confidence.',
      'A data operating model should define who approves standards, who fixes defects, and how exceptions are escalated.',
      'Migration defects are often symptoms of weak source process discipline, so the goal is not just cleansing but prevention.',
    ],
    Commercial: [
      'Licence and support spend usually grows in the gaps between role design, environment sprawl, and unclear service boundaries.',
      'Review commercial controls alongside access controls and release planning so cost decisions are part of governance rather than an annual surprise.',
      'The aim is not only to cut spend but to spend clearly on the capabilities that actually create value.',
    ],
    Optimisation: [
      'Once the initial project ends, ERP teams need a visible way to prioritise improvements so the platform keeps getting better instead of becoming a dumping ground for requests.',
      'A BAU roadmap should balance small operational fixes, control improvements, reporting gains, and strategic platform enhancements.',
      'Leadership support tends to hold when each release is tied back to measured value, reduced risk, or reduced manual work.',
    ],
  }

  const universalMistakes = [
    'Confusing software functionality with business readiness.',
    'Assuming a partner or vendor will solve unclear process ownership for you.',
    'Treating post-selection execution risks as someone else’s problem.',
  ]

  const nextSteps = [
    'Translate the key points into a shortlist scorecard, project risk log, or operating checklist the team can use immediately.',
    'Use the article to shape the next vendor demo, partner workshop, or internal decision forum rather than leaving it as passive research.',
    'Pair this article with a relevant guide or comparison page before final decisions are made.',
  ]

  return skimmableBlocks(
    leadParagraphs,
    ['## Why this matters'],
    (byCategory[category] || []).map((item) => `• ${item}`),
    ['## What to check in practice'],
    [
      `• ${leadParagraphs[0] || 'Start with the operating issue the business is really trying to solve.'}`,
      `• ${leadParagraphs[1] || 'Turn that issue into visible checkpoints, ownership, and decision criteria.'}`,
      `• ${leadParagraphs[2] || 'Use evidence from real workflows so the team can separate attractive demos from workable design.'}`,
    ],
    ['## Mistakes that create avoidable project pain'],
    universalMistakes.map((item) => `• ${item}`),
    ['## What to do next'],
    nextSteps.map((item) => `• ${item}`),
  )
}

const pillarGuideBlocks = (slug: string) => {
  const content: Record<string, string[][]> = {
    'erp-selection-checklist-smb': [
      ['Most ERP shortlists go wrong long before contract signature. The problem is rarely that teams did not work hard enough; it is that they evaluated products before agreeing how success would be judged.', 'For a small or medium business, the cost of a weak shortlist is high. You lose months in demos, absorb avoidable consulting spend, and often end up choosing the partner who sounded safest rather than the platform that fits your operating model.', 'A strong checklist should help the team slow down in the right places: scope, commercial assumptions, data quality, operational constraints, and ownership of decisions.'],
      ['## The questions to answer before you talk to vendors'],
      [
        '• What are the top business outcomes the programme is meant to deliver in the next 12 to 24 months: better stock control, faster close, cleaner project billing, lower manual rework, or better reporting confidence?',
        '• Which processes are truly in scope for phase one, and which are being left out on purpose so the project remains executable?',
        '• Which current pain points are process problems rather than system problems, and therefore should not be solved by software alone?',
        '• Which constraints are non-negotiable: existing Microsoft stack, Australian reporting requirements, group structure, warehouse complexity, CRM dependency, or project accounting needs?',
      ],
      ['## What a useful vendor scorecard should include'],
      [
        '• Operational fit: order-to-cash, procure-to-pay, warehouse flow, production, project delivery, or service coverage based on your real scenarios.',
        '• Finance and reporting fit: management packs, approvals, audit trail, close effort, dimension model, and group visibility.',
        '• Delivery risk: data migration difficulty, integration count, change management load, testing effort, and internal team readiness.',
        '• Partner confidence: relevant industry experience, realistic scope assumptions, governance method, local support strength, and reference quality.',
        '• Commercial clarity: software, implementation, support, enhancement, and hidden future costs rather than headline licence price alone.',
      ],
      ['## Common small-business selection mistakes'],
      [
        '• Letting a polished demo outweigh the evidence from real operating scenarios.',
        '• Treating implementation partner choice as a later commercial step instead of part of the product decision itself.',
        '• Trying to include every process pain point in phase one because leadership wants “one big reset”.',
        '• Ignoring master data quality and assuming the new system will solve it automatically.',
        '• Failing to document why the losing vendors lost, which weakens internal alignment when commercial pressure starts.',
      ],
      ['## A practical selection rhythm'],
      [
        '• Week 1 to 2: agree business outcomes, shortlist criteria, and phase-one scope boundaries.',
        '• Week 3 to 4: run targeted demos using your own scenarios and edge cases.',
        '• Week 5: compare delivery assumptions, partner quality, and commercial model side by side.',
        '• Week 6: run reference checks and a final decision workshop with named sign-off owners.',
      ],
      ['## FAQ'],
      [
        '• How many vendors should we shortlist? Usually two or three. More than that creates noise and slows decision quality.',
        '• Should we run an RFP? Only if the business already understands its real requirements. Otherwise, a lighter scenario-led process is usually more useful.',
        '• How early should we involve finance? Immediately. Finance structure, control needs, and reporting expectations shape the whole selection outcome.',
      ],
    ],
    'navision-to-business-central-migration': [
      ['NAV to Business Central decisions often get framed as a technical exercise. In practice, they are business design decisions disguised as an upgrade conversation.', 'If the legacy NAV estate carries years of customisations, reporting workarounds, and manual controls, the wrong migration path can leave the business paying modern software costs for yesterday’s operating model.', 'The useful question is not only whether you can upgrade. It is whether you should preserve the current design, reshape it, or reset parts of it while moving to Business Central.'],
      ['## What to assess before choosing upgrade or reimplementation'],
      [
        '• Extension footprint: how many custom objects, reports, and integrations are genuinely still needed?',
        '• Process drift: how far has the live system moved from the original intended process design?',
        '• Reporting debt: are close, stock, margin, or project reports being held together outside the ERP?',
        '• Data quality: would a direct migration simply carry broken structures and duplicate records into the new platform?',
        '• Business change appetite: is leadership expecting process redesign or only technical currency?',
      ],
      ['## Signals that a reimplementation may be the better path'],
      [
        '• Teams cannot explain why several customisations exist or who still owns them.',
        '• Critical processes such as approvals, inventory control, or customer pricing are partly outside the system.',
        '• The business wants a new reporting model, stronger controls, or a cleaner CRM and warehouse integration approach.',
        '• Data structures are inconsistent enough that migration and testing would be painful either way.',
      ],
      ['## What a good migration plan looks like'],
      [
        '• Run discovery with business leads and technical leads together so the future design is not biased by only one lens.',
        '• Build a conversion register covering extensions, reports, interfaces, user groups, and manual controls.',
        '• Prove the cutover sequence in rehearsals with real timings, business sign-offs, and rollback decisions.',
        '• Protect the first month-end close and first full operating week as hard go-live criteria rather than afterthoughts.',
      ],
      ['## FAQ'],
      [
        '• Can we phase the migration? Yes, but only if the business can tolerate temporary process splits and clear ownership exists across legacy and new environments.',
        '• Is a technical upgrade always cheaper? Not necessarily. Preserving poor design can create more cost later in support, reporting, and improvement work.',
        '• Should we clean data before or during migration? Before and during. Early ownership matters, but real issues only fully emerge during rehearsal cycles.',
      ],
    ],
    'business-central-implementation-wholesale-distribution': [
      ['Distribution implementations live or die in the detail of inventory policy, warehouse flow, and item data. This is why apparently “simple” distributor rollouts often become expensive when the operational design has not been settled up front.', 'Business Central can support a strong distribution model, but only when the team is honest about replenishment logic, landed cost handling, location rules, barcode process, and exception management.', 'The aim is not just to get transactions into the system. It is to help the warehouse, purchasing, customer service, and finance teams all trust the same picture of stock and margin.'],
      ['## The process areas that deserve the most design time'],
      [
        '• Item master policy: units of measure, variants, substitutions, serial or lot controls, and how new items are approved.',
        '• Replenishment and purchasing: reorder logic, supplier lead times, demand spikes, and backorder handling.',
        '• Warehouse execution: receiving, put-away, bin discipline, wave picking, dispatch confirmation, and stock adjustments.',
        '• Customer service: order promises, partial fulfilment rules, credit hold handling, and return process design.',
        '• Finance alignment: margin visibility, landed cost treatment, and inventory valuation confidence.',
      ],
      ['## What to challenge in partner proposals'],
      [
        '• Generic assumptions that “standard warehousing” is enough without walking the floor process in detail.',
        '• Weak thinking about data governance, especially item records, supplier catalogues, and customer pricing conditions.',
        '• No clear plan for barcode or mobility design even though warehouse accuracy is a major project objective.',
        '• Training that focuses on screens rather than role-based operating routines.',
      ],
      ['## What good readiness looks like before go-live'],
      [
        '• Supervisors can explain the receiving, picking, and adjustment process without relying on the implementation team.',
        '• Replenishment settings have been tested against recent demand reality rather than accepted as configuration defaults.',
        '• Finance understands how inventory movement and landed cost decisions will affect reporting and close.',
        '• Stock accuracy checkpoints, service-level KPIs, and hypercare triage priorities are agreed before launch week.',
      ],
      ['## FAQ'],
      [
        '• Should scanning be phase one? If warehouse accuracy and speed are core value drivers, usually yes.',
        '• How much time should item data clean-up take? More than most teams expect. It is worth front-loading.',
        '• Can we fix warehouse process after go-live? Some tuning is normal, but core flow issues should be addressed before launch or they will dominate hypercare.',
      ],
    ],
    'd365-sales-business-central-integration-guide': [
      ['The value of connecting D365 Sales with Business Central is not simply that data moves between two Microsoft products. The value comes from designing a commercial operating model that sales, operations, and finance all trust.', 'Most handover failures occur at the exact moments where ownership is fuzzy: quote approval, pricing, customer master quality, order conversion, delivery expectations, and exception recovery.', 'A good integration approach keeps the hand-off narrow, explicit, and visible. A bad one synchronises too much data and leaves nobody clearly accountable when records fail.'],
      ['## The decisions to make early'],
      [
        '• Which system owns each stage of the customer journey: prospect, quote, order, invoice, and account service?',
        '• Which fields are truly shared and which should remain native to one platform?',
        '• What approvals are required before a quote becomes an order or a customer becomes active in ERP?',
        '• How will failed synchronisations be surfaced, triaged, and corrected by business users?',
      ],
      ['## Design principles that keep the integration healthy'],
      [
        '• Keep the integration boundary small enough that ownership remains obvious.',
        '• Prioritise data quality and commercial governance before adding convenience syncs.',
        '• Build business-readable exception queues and named support paths.',
        '• Test quote, order, pricing, and credit scenarios with real edge cases, not just clean happy-path flows.',
      ],
      ['## What to watch after launch'],
      [
        '• Duplicate customer or contact creation.',
        '• Quote-to-order failures due to incomplete mandatory data or pricing mismatches.',
        '• Sales teams bypassing the intended process because turnaround times are too slow.',
        '• Finance and operations manually correcting records outside agreed controls.',
      ],
      ['## FAQ'],
      [
        '• Should all CRM data sync to ERP? No. Only the fields needed to run the downstream process cleanly.',
        '• Who should own the integration? Jointly owned, but with explicit business and technical leads.',
        '• Is this mainly a technical project? No. The hard work is commercial process design and ownership.',
      ],
    ],
    'how-to-choose-erp-implementation-partner': [
      ['Many ERP buyers spend far more time comparing software than comparing delivery partners. That is backwards. For most small and medium businesses, the implementation partner has as much influence on project success as the platform itself.', 'A strong partner brings structured governance, industry judgement, honest scope boundaries, and a team that can translate software into workable business design. A weak partner creates confidence in sales and ambiguity in delivery.', 'The right partner choice should reduce project risk, not just offer an acceptable day rate.'],
      ['## What to test beyond the sales presentation'],
      [
        '• Who will actually lead the programme, configure the system, manage testing, and support cutover?',
        '• What assumptions are built into the fixed price or estimate, and what happens when those assumptions prove wrong?',
        '• How does the partner handle governance, scope control, risk escalation, and change requests?',
        '• Can they show evidence from businesses with similar industry pressures, complexity, and leadership style?',
      ],
      ['## Good signs in a partner process'],
      [
        '• They ask difficult business questions early instead of jumping straight to software configuration.',
        '• Their delivery method includes decision logs, RAID management, role-based training, and realistic testing effort.',
        '• References speak about communication discipline and issue resolution, not only likeability.',
        '• The proposed team feels coherent rather than stitched together for the bid.',
      ],
      ['## Red flags to watch for'],
      [
        '• The senior people sell the project but cannot explain who will stay involved after signature.',
        '• Key assumptions about migration, integrations, reporting, or change management are vague.',
        '• The partner agrees to every request quickly without explaining trade-offs or delivery consequences.',
        '• Commercial language is soft around out-of-scope work, making later disputes likely.',
      ],
      ['## FAQ'],
      [
        '• Should we pick the cheapest partner? Usually no. Low pricing often hides weak assumptions or limited delivery depth.',
        '• How many references should we check? At least two strong fit references and one more probing conversation if possible.',
        '• Is industry experience mandatory? Not always, but it matters a lot when your operational model is specialised.',
      ],
    ],
  }

  return skimmableBlocks(...(content[slug] || []))
}

const pillarComparisonBlocks = (slug: string) => {
  const content: Record<string, string[][]> = {
    'netsuite-vs-sage-intacct-finance-first-teams': [
      ['Finance-led ERP choices usually get framed too narrowly as “best accounting system wins”. In reality, finance-first teams still need to decide how much operational depth they want in the core platform, how future growth will change reporting needs, and how much integration overhead they are willing to own.', 'NetSuite and Sage Intacct can both be good choices, but they tend to serve different operating futures. The useful comparison is not which one has the nicer finance demo. It is which one fits the likely shape of the business over the next two years.', 'If the business expects multi-entity complexity, stronger operational control, or wider platform standardisation, the answer may differ from a business that mainly wants cleaner close, better approvals, and stronger management reporting.'],
      ['## Where NetSuite usually makes the stronger case'],
      [
        '• The business wants broader ERP coverage in the core platform rather than a finance core with several adjacent systems.',
        '• Multi-entity growth, international expansion, or operational standardisation is likely within the planning horizon.',
        '• Leadership is prepared to invest in a larger implementation to get to a more unified model.',
        '• The organisation wants one platform conversation rather than several system boundary conversations.',
      ],
      ['## Where Sage Intacct often wins'],
      [
        '• The immediate pain is finance visibility, close control, approvals, and reporting rather than broad operational redesign.',
        '• The business is comfortable keeping some specialist operational tools in place for now.',
        '• Leadership wants a more focused finance transformation with lower platform complexity in the near term.',
        '• The team values implementation simplicity and faster finance-led adoption more than broader ERP breadth.',
      ],
      ['## Questions finance teams should push hard on'],
      [
        '• How will each option handle entity structure, consolidations, intercompany, and management pack production in your real reporting model?',
        '• What happens to budgeting, approvals, audit trail, and close ownership under pressure at month-end?',
        '• If operations remain partly outside the finance platform, who owns the integration quality and reporting consistency?',
        '• Which implementation partner has the stronger track record in finance design, not just software deployment?',
      ],
      ['## What this choice looks like in practice'],
      [
        '• Choose NetSuite when finance transformation is part of a wider operating model change and the business wants the platform to carry more of that future state.',
        '• Choose Sage Intacct when finance depth is the urgent priority and the business is not yet ready to widen the scope into a more comprehensive ERP redesign.',
        '• In both cases, test the answer against your next phase of growth, not only today’s pain points.',
      ],
      ['## FAQ'],
      [
        '• Is NetSuite always better for scaling businesses? No. It depends on whether the business really needs broader ERP scope soon.',
        '• Is Intacct too limited for growth? Not necessarily. It can be the right finance-first move when the operating model stays relatively focused.',
        '• What causes bad decisions here? Overweighting generic finance demos and underweighting future operating complexity and partner quality.',
      ],
    ],
    'business-central-vs-netsuite-growing-businesses': [
      ['This is one of the most common shortlist decisions for growing Australian businesses because both platforms can support a meaningful step up from legacy systems or spreadsheet-heavy operations. The mistake is assuming they solve the same growth problem in the same way.', 'Business Central often appeals where Microsoft alignment, staged maturity, and practical operational control matter. NetSuite often appeals where cloud-first standardisation, broader native footprint, and multi-entity ambition are stronger drivers.', 'The choice becomes clearer when the business defines where complexity will sit: inside one broader platform, or within a more staged ecosystem anchored around Microsoft tooling.'],
      ['## When Business Central tends to fit better'],
      [
        '• The business already relies heavily on Microsoft tools and wants a pragmatic extension of that ecosystem.',
        '• Growth is real, but the team still wants a staged implementation approach rather than a broad transformation all at once.',
        '• Operational areas like warehousing, purchasing, projects, or reporting need to improve without over-engineering the solution.',
        '• Internal change capacity is limited and the business values familiarity and incremental maturity.',
      ],
      ['## When NetSuite tends to fit better'],
      [
        '• Leadership wants a stronger cloud-standard operating model and is prepared to change ways of working to get there.',
        '• Multi-entity design and governance matter early rather than later.',
        '• The business wants to reduce architectural fragmentation by consolidating more process in the core platform.',
        '• The implementation team and sponsors are prepared for a more substantial design and adoption effort.',
      ],
      ['## What to pressure-test before deciding'],
      [
        '• Reporting model and finance structure: which option better supports the management questions leaders actually ask?',
        '• Delivery model: which partner team feels more likely to govern the programme well in your environment?',
        '• Operational edge cases: warehouse exceptions, pricing conditions, approvals, intercompany, or project complexity.',
        '• Improvement path: which platform will leave the business with a cleaner next 18-month roadmap rather than a new backlog of workarounds?',
      ],
      ['## FAQ'],
      [
        '• Is Business Central only for simpler businesses? No. The better question is whether the operating model and delivery path fit how the business wants to mature.',
        '• Is NetSuite always more future-proof? Not by default. Future value depends on whether the organisation can absorb the design and governance model well.',
        '• What usually breaks the tie? Partner quality, change capacity, and clarity on future operating scope.',
      ],
    ],
  }

  return skimmableBlocks(...(content[slug] || []))
}

const pillarPostBlocks = (slug: string) => {
  const content: Record<string, string[][]> = {
    'erp-priorities-professional-services-project-firms': [
      ['Professional services and project-based businesses often outgrow their tools in a very specific way: sales, delivery, time capture, billing, and finance all work individually, but the hand-offs between them are where margin disappears.', 'That is why ERP selection for services firms should start with project economics rather than software module lists. The core question is whether leaders can see resource demand, WIP, billing position, and project profitability clearly enough to make timely decisions.', 'If the answer is no, the system landscape is usually creating friction between CRM, PSA, finance, and reporting rather than supporting a clean commercial operating rhythm.'],
      ['## The capabilities that matter most'],
      [
        '• Project margin visibility by client, project, work type, and delivery stage.',
        '• Timesheet and expense capture that is easy enough for the business to trust and hard enough to preserve control.',
        '• Billing flexibility for milestones, retainers, T&M, and mixed commercial models.',
        '• Revenue recognition rules that align with the firm’s finance policy and audit expectations.',
        '• Resource planning visibility so pipeline, committed work, and delivery capacity can be read together.',
      ],
      ['## Where services firms commonly lose money'],
      [
        '• Delayed or inaccurate timesheets that make project margin reporting unreliable.',
        '• CRM and finance systems disagreeing on sold scope, rate cards, or change requests.',
        '• WIP and milestone billing handled manually in spreadsheets with weak approval discipline.',
        '• Project managers making delivery calls without a live view of commercial impact.',
      ],
      ['## What to demand in vendor demos'],
      [
        '• A realistic journey from opportunity to statement of work to active project to billing and close.',
        '• Margin reporting during project delivery, not just after invoicing.',
        '• Approval flows for write-offs, rate changes, discounts, and billing exceptions.',
        '• Resource and project leaders using the same truth rather than stitched-together reports.',
      ],
      ['## FAQ'],
      [
        '• Can we keep separate PSA and finance tools? Yes, but only if ownership of the hand-offs is disciplined.',
        '• What matters more: utilisation or margin? Both, but margin is usually the cleaner board-level outcome measure.',
        '• What is the biggest selection mistake? Choosing based on generic accounting strength without testing the project lifecycle deeply enough.',
      ],
    ],
    'vendor-demo-script-erp-buyers-what-to-ask': [
      ['Most ERP demos feel productive in the moment and useless afterwards. Buyers leave with notes, impressions, and a vague sense of preference, but not with decision-grade evidence.', 'A proper demo script changes that. It forces vendors to show how the system behaves in your reality: messy approvals, exception handling, reporting pressure, master data issues, and hand-offs between departments.', 'The point is not to catch vendors out. The point is to create comparable evidence so the team can separate presentation quality from true business fit.'],
      ['## What a strong demo script should contain'],
      [
        '• One or two end-to-end scenarios for each critical business flow.',
        '• Edge cases that regularly create pain today, such as backorders, project changes, returns, intercompany movement, or approval exceptions.',
        '• Required outputs: reports, approvals, alerts, dashboards, or audit trail evidence the business needs to see.',
        '• A structured scorecard completed live by business owners, not recollected days later.',
      ],
      ['## Questions to ask during the demo'],
      [
        '• What part of this flow is standard versus configured versus custom-built?',
        '• Where would our team need to change process to make this work cleanly?',
        '• What assumptions are you making about data quality, role discipline, or governance?',
        '• What would normally go wrong in this scenario during implementation, and how would your team reduce that risk?',
      ],
      ['## What to avoid'],
      [
        '• Letting the vendor set the agenda entirely.',
        '• Accepting screenshots or future promises instead of seeing the live workflow.',
        '• Blending product demo and partner sales pitch so it becomes hard to separate software fit from delivery confidence.',
        '• Waiting until the end of the process to compare notes rather than scoring each scenario live.',
      ],
      ['## FAQ'],
      [
        '• How long should a demo be? Long enough to test the key scenarios properly, usually shorter and sharper than a generic half-day tour.',
        '• Should we give vendors the script in advance? Yes, if the goal is fair comparison rather than surprise.',
        '• Who should score the demo? Process owners, finance, and a programme lead with a common scoring model.',
      ],
    ],
    'month-end-close-new-erp-first-three-cycles-playbook': [
      ['The first three month-end closes after go-live are where finance credibility is won or lost. Leaders usually tolerate small operating friction in the opening weeks, but they are far less forgiving when the new ERP makes close slower, more manual, or less reliable.', 'That is why the close should be run as a structured stabilisation workstream, not as an assumption that finance will simply “work it out” after go-live.', 'A good close playbook gives the business a visible rhythm: ownership by domain, daily checkpoints, and fast classification of issues by business impact.'],
      ['## What to lock down before the first close starts'],
      [
        '• Named owners for journals, reconciliations, allocations, intercompany, reporting pack production, and approvals.',
        '• A close calendar with due times, dependencies, and escalation points.',
        '• A short list of critical reports and reconciliations that must be accurate for leadership confidence.',
        '• A triage path for defects: accounting impact, operational impact, root cause, workaround, and permanent fix owner.',
      ],
      ['## How the first three cycles should differ'],
      [
        '• Cycle 1: focus on control, visibility, and survival. Document every friction point and keep issue ownership explicit.',
        '• Cycle 2: reduce manual interventions and tighten turnaround times for recurring issues.',
        '• Cycle 3: confirm whether the close rhythm is becoming stable enough to move out of intensive support mode.',
      ],
      ['## Watch-outs that usually create avoidable pain'],
      [
        '• Journals and reconciliations living in personal workarounds rather than agreed team routines.',
        '• Poor hand-offs between operations and finance on stock, billing, or project updates.',
        '• Reporting packs requiring too many manual fixes because the master data and transaction discipline are not yet stable.',
        '• Hypercare teams treating finance issues as lower priority than operational tickets.',
      ],
      ['## FAQ'],
      [
        '• Should finance be in hypercare leadership? Yes. Close risk is a business risk, not a back-office detail.',
        '• How long should we run close command-centre style support? Usually until at least two cycles are stable.',
        '• What is the best success measure? Faster close matters, but confidence in numbers matters more.',
      ],
    ],
  }

  return skimmableBlocks(...(content[slug] || []))
}

const publishedAt = '2026-03-01T00:00:00Z'

export const mockGuides: GuideDoc[] = [
  {
    _id: 'guide-erp-selection-checklist-smb',
    _type: 'guide',
    title: 'ERP selection checklist for small and medium businesses',
    slug: 'erp-selection-checklist-smb',
    excerpt: 'A practical checklist to align scope, business outcomes, demos, and decision controls before you shortlist vendors.',
    intent: 'Selection',
    publishedAt,
    updatedAt: publishedAt,
    seo: {
      metaTitle: 'ERP Selection Checklist for Small and Medium Businesses',
      metaDescription: 'Use this ERP selection checklist to avoid expensive rework and compare vendors with consistent scoring criteria.',
    },
    body: pillarGuideBlocks('erp-selection-checklist-smb'),
  },
  {
    _id: 'guide-navision-to-bc-migration',
    _type: 'guide',
    title: 'NAV/Navision to Business Central migration guide',
    slug: 'navision-to-business-central-migration',
    excerpt: 'How to assess upgrade vs reimplementation, manage extensions, and run a controlled cutover from NAV to Business Central.',
    intent: 'Migration',
    publishedAt,
    updatedAt: publishedAt,
    seo: {
      metaTitle: 'NAV to Business Central Migration Guide',
      metaDescription: 'Step-by-step NAV to Business Central migration guide covering data, extensions, testing, and go-live controls.',
    },
    body: pillarGuideBlocks('navision-to-business-central-migration'),
  },
  {
    _id: 'guide-bc-distribution',
    _type: 'guide',
    title: 'Business Central implementation guide for wholesale and distribution',
    slug: 'business-central-implementation-wholesale-distribution',
    excerpt: 'Configure inventory, replenishment, purchasing, and warehousing with practical controls for distributors.',
    intent: 'Implementation',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarGuideBlocks('business-central-implementation-wholesale-distribution'),
  },
  {
    _id: 'guide-bc-manufacturing',
    _type: 'guide',
    title: 'Business Central for manufacturing: MRP and shop floor essentials',
    slug: 'business-central-manufacturing-mrp-shop-floor',
    excerpt: 'A no-nonsense guide to BOMs, routings, capacity, and planning parameters for small and medium manufacturers.',
    intent: 'Manufacturing',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Manufacturing', [
      'MRP quality is only as good as your item data, lead times, and routing assumptions.',
      'Stabilise master data before introducing advanced planning features to avoid system-generated noise.',
      'Pilot one product family first, then scale by production line once planners trust suggested actions.',
    ]),
  },
  {
    _id: 'guide-d365-sales-bc-integration',
    _type: 'guide',
    title: 'D365 Sales + Business Central integration guide',
    slug: 'd365-sales-business-central-integration-guide',
    excerpt: 'Connect CRM and ERP with clear data ownership, integration boundaries, and opportunity-to-order controls.',
    intent: 'CRM + ERP',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarGuideBlocks('d365-sales-business-central-integration-guide'),
  },
  {
    _id: 'guide-partner-selection',
    _type: 'guide',
    title: 'How to choose an ERP implementation partner',
    slug: 'how-to-choose-erp-implementation-partner',
    excerpt: 'Assess delivery model, team quality, references, and commercials before appointing a partner.',
    intent: 'Partner Selection',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarGuideBlocks('how-to-choose-erp-implementation-partner'),
  },
  {
    _id: 'guide-finance-dimensions',
    _type: 'guide',
    title: 'Finance design guide: chart of accounts, dimensions, and reporting',
    slug: 'erp-finance-design-chart-accounts-dimensions',
    excerpt: 'Design finance structures that support management reporting without creating month-end complexity.',
    intent: 'Finance',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Finance', [
      'Overly detailed chart structures create long-term maintenance pain and inconsistent reporting.',
      'Use dimensions for analysis where possible and reserve account proliferation for statutory needs.',
      'Test reporting packs with real management questions before finalising design.',
    ]),
  },
  {
    _id: 'guide-data-migration-playbook',
    _type: 'guide',
    title: 'ERP data migration playbook for clean cutover',
    slug: 'erp-data-migration-playbook-clean-cutover',
    excerpt: 'Plan extraction, mapping, cleansing, reconciliation, and rehearsals to reduce go-live surprises.',
    intent: 'Data Migration',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Data Migration', [
      'Treat migration as a recurring programme of dry runs, not a one-off technical activity at the end of the project.',
      'Define authoritative sources and reconciliation rules early to avoid disputes during user acceptance testing.',
      'Use cutover rehearsals with timed runbooks to prove the transition window is realistic.',
    ]),
  },
  {
    _id: 'guide-governance-smb',
    _type: 'guide',
    title: 'ERP governance model for owner-led and family-run businesses',
    slug: 'erp-governance-owner-led-family-businesses',
    excerpt: 'Establish decision rights, escalation paths, and steering cadence suitable for lean leadership teams.',
    intent: 'Governance',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Governance', [
      'Smaller leadership teams can move quickly, but only if decision rights are explicit and documented.',
      'Use a weekly operating forum for blockers and a monthly steering forum for scope, budget, and risk calls.',
      'Keep project and business accountabilities separate so day-to-day firefighting does not erode programme control.',
    ]),
  },
  {
    _id: 'guide-warehouse-redesign',
    _type: 'guide',
    title: 'Warehouse process redesign before ERP go-live',
    slug: 'warehouse-process-redesign-before-erp-go-live',
    excerpt: 'Align receiving, put-away, picking, and stocktake routines with ERP controls before launch.',
    intent: 'Operations',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Operations', [
      'Do not automate a broken warehouse process; redesign key workflows before system build.',
      'Define operational KPIs such as pick accuracy, dispatch performance, and inventory variance at location level.',
      'Train supervisors first so frontline coaching continues after consultants leave site.',
    ]),
  },
  {
    _id: 'guide-multi-entity',
    _type: 'guide',
    title: 'Multi-entity ERP setup for growing business groups',
    slug: 'multi-entity-erp-setup-growing-business-groups',
    excerpt: 'How to set up legal entities, shared services, and intercompany controls without overengineering.',
    intent: 'Multi-entity',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Multi-entity', [
      'Confirm legal and tax reporting needs first, then design shared process templates across entities.',
      'Automate intercompany entries where possible but keep reconciliation controls visible to finance.',
      'Pilot with two entities before scaling to the full group.',
    ]),
  },
  {
    _id: 'guide-pricing-margin-controls',
    _type: 'guide',
    title: 'Pricing and margin control framework in Business Central',
    slug: 'pricing-margin-control-framework-business-central',
    excerpt: 'Set up pricing rules, discount approvals, and margin visibility to protect commercial performance.',
    intent: 'Commercial',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Commercial', [
      'Without governance, discounting behaviour can erode margin quickly after go-live.',
      'Implement approval thresholds and exception workflows tied to gross margin impact.',
      'Use daily margin reporting during hypercare to detect control gaps early.',
    ]),
  },
  {
    _id: 'guide-post-go-live-90-days',
    _type: 'guide',
    title: 'Post-go-live stabilisation plan: first 90 days',
    slug: 'post-go-live-stabilisation-plan-first-90-days',
    excerpt: 'A practical operating model for hypercare, defect triage, and continuous improvement after launch.',
    intent: 'Post Go-live',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Post Go-live', [
      'Hypercare should be structured with clear ownership, SLA targets, and root-cause tracking.',
      'Separate critical business interruption defects from enhancement requests to protect focus.',
      'Transition to BAU only after process KPIs stabilise for at least two close cycles.',
    ]),
  },
  {
    _id: 'guide-security-access-controls',
    _type: 'guide',
    title: 'ERP security and access controls for SMB organisations',
    slug: 'erp-security-access-controls-smb-organisations',
    excerpt: 'Design role-based access, segregation of duties, and approval controls suitable for lean teams.',
    intent: 'Security',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Security', [
      'Security design should follow business process roles, not job titles alone.',
      'Prioritise segregation around payments, vendor master maintenance, and credit overrides.',
      'Run periodic access reviews with finance and operations leaders, not just IT.',
    ]),
  },
  {
    _id: 'guide-customisations-vs-spreadsheets',
    _type: 'guide',
    title: 'When to customise ERP vs keep spreadsheets',
    slug: 'when-to-customise-erp-vs-keep-spreadsheets',
    excerpt: 'A decision framework to reduce unnecessary customisations while still solving real business constraints.',
    intent: 'Architecture',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedGuideBlocks('Architecture', [
      'Some spreadsheet usage is acceptable if controls and ownership are clear.',
      'Customise only when the process is stable, high-value, and unlikely to change materially.',
      'Assess upgrade impact before approving any extension backlog item.',
    ]),
  },
]

export const mockComparisons: ComparisonDoc[] = [
  {
    _id: 'comparison-bc-vs-netsuite',
    _type: 'comparison',
    title: 'Business Central vs NetSuite for growing businesses',
    slug: 'business-central-vs-netsuite-growing-businesses',
    excerpt: 'Fit, complexity, and implementation trade-offs for finance-led and operations-led organisations.',
    leftProduct: 'Dynamics 365 Business Central',
    rightProduct: 'NetSuite',
    bestFor: [
      'Business Central: Microsoft ecosystem alignment and staged operational maturity',
      'NetSuite: finance-driven global standardisation and cloud-first governance',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: pillarComparisonBlocks('business-central-vs-netsuite-growing-businesses'),
  },
  {
    _id: 'comparison-bc-vs-acumatica',
    _type: 'comparison',
    title: 'Business Central vs Acumatica for distribution and project services',
    slug: 'business-central-vs-acumatica-distribution-project-services',
    excerpt: 'A side-by-side view of fit, configurability, and implementation risk for mid-complexity businesses.',
    leftProduct: 'Dynamics 365 Business Central',
    rightProduct: 'Acumatica',
    bestFor: [
      'Business Central: organisations already invested in Microsoft tooling',
      'Acumatica: businesses prioritising configurability and partner-led deployment models',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: detailedComparisonBlocks('erpPlatform', [
      'Both platforms can serve growing businesses well when the implementation scope is disciplined.',
      'Partner methodology and vertical experience often outweigh minor feature differences.',
      'Evaluate reporting, inventory control depth, and extension governance early.',
    ], 'Dynamics 365 Business Central', 'Acumatica'),
  },
  {
    _id: 'comparison-bc-vs-sap-b1',
    _type: 'comparison',
    title: 'Business Central vs SAP Business One: practical fit analysis',
    slug: 'business-central-vs-sap-business-one-fit-analysis',
    excerpt: 'A practical guide to ecosystem fit, deployment model, and long-term maintainability.',
    leftProduct: 'Dynamics 365 Business Central',
    rightProduct: 'SAP Business One',
    bestFor: [
      'Business Central: cloud-forward organisations seeking broader Microsoft alignment',
      'SAP Business One: teams with established SAP Business One partner and process footprint',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: detailedComparisonBlocks('erpPlatform', [
      'The right choice depends on internal capability and partner support quality as much as product design.',
      'Validate local support and upgrade path assumptions before committing.',
      'Run cost models over three years, including support and enhancement effort.',
    ], 'Dynamics 365 Business Central', 'SAP Business One'),
  },
  {
    _id: 'comparison-netsuite-vs-intacct',
    _type: 'comparison',
    title: 'NetSuite vs Sage Intacct for finance-first teams',
    slug: 'netsuite-vs-sage-intacct-finance-first-teams',
    excerpt: 'Compare finance depth, operational coverage, and rollout approach for scaling organisations.',
    leftProduct: 'NetSuite',
    rightProduct: 'Sage Intacct',
    bestFor: [
      'NetSuite: broader ERP footprint with multi-entity operational requirements',
      'Sage Intacct: finance-led organisations with selective operational system integration',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: pillarComparisonBlocks('netsuite-vs-sage-intacct-finance-first-teams'),
  },
  {
    _id: 'comparison-erp-crm-strategy',
    _type: 'comparison',
    title: 'Integrated ERP+CRM stack vs separate best-of-breed stack',
    slug: 'integrated-erp-crm-vs-best-of-breed-stack',
    excerpt: 'Decide whether a unified platform or separate systems is better for your growth stage and operating model.',
    leftProduct: 'Integrated ERP + CRM',
    rightProduct: 'Best-of-breed ERP + CRM',
    bestFor: [
      'Integrated: lean IT teams prioritising simpler governance',
      'Best-of-breed: organisations with mature integration capability and specialist needs',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: detailedComparisonBlocks('stackStrategy', [
      'Integration complexity is often underestimated in best-of-breed strategies.',
      'Unified stacks reduce moving parts but can limit specialist process depth.',
      'Choose based on team capability and change management bandwidth.',
    ], 'Integrated ERP + CRM', 'Best-of-breed ERP + CRM'),
  },
  {
    _id: 'comparison-nav-upgrade-vs-reimplement',
    _type: 'comparison',
    title: 'NAV technical upgrade vs full reimplementation',
    slug: 'nav-technical-upgrade-vs-full-reimplementation',
    excerpt: 'A decision framework for legacy NAV customers modernising to Business Central.',
    leftProduct: 'Technical Upgrade',
    rightProduct: 'Reimplementation',
    bestFor: [
      'Technical upgrade: stable processes with manageable customisation footprint',
      'Reimplementation: significant process redesign and legacy clean-up objectives',
    ],
    publishedAt,
    updatedAt: publishedAt,
    body: detailedComparisonBlocks('migrationStrategy', [
      'Assess business process change requirements before deciding technical strategy.',
      'Hidden legacy complexity can make reimplementation the lower-risk option in practice.',
      'Pilot data migration and extension conversion on a representative subset first.',
    ], 'Technical Upgrade', 'Reimplementation'),
  },
]

export const mockPosts: PostDoc[] = [
  {
    _id: 'post-distribution-red-flags',
    _type: 'post',
    title: 'Seven ERP red flags for distributors before contract signing',
    slug: 'seven-erp-red-flags-distributors-before-contract-signing',
    excerpt: 'Common warning signs in scope, inventory design, and delivery assumptions that lead to avoidable overruns.',
    category: 'Distribution',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Distribution', [
      'Distribution projects often fail at master data design rather than software capability.',
      'Look for vague language around warehouse processes, barcode strategy, and replenishment logic.',
      'Insist on scenario-based fit validation before contract execution.',
    ]),
  },
  {
    _id: 'post-manufacturing-kpis',
    _type: 'post',
    title: 'Manufacturing ERP KPI pack: what to baseline before go-live',
    slug: 'manufacturing-erp-kpi-pack-before-go-live',
    excerpt: 'A practical KPI baseline covering service levels, scheduling stability, and inventory performance.',
    category: 'Manufacturing',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Manufacturing', [
      'You cannot prove ERP value if there is no baseline to compare against.',
      'Track OTIF, schedule adherence, inventory turns, and rework rates before and after launch.',
      'Make KPI ownership explicit across operations, finance, and IT.',
    ]),
  },
  {
    _id: 'post-services-projects',
    _type: 'post',
    title: 'ERP priorities for professional services and project-based firms',
    slug: 'erp-priorities-professional-services-project-firms',
    excerpt: 'How to prioritise project profitability, utilisation, and billing controls in ERP selection.',
    category: 'Professional Services',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarPostBlocks('erp-priorities-professional-services-project-firms'),
  },
  {
    _id: 'post-retail-omnichannel',
    _type: 'post',
    title: 'Retail ERP: omnichannel stock accuracy and margin controls',
    slug: 'retail-erp-omnichannel-stock-accuracy-margin-controls',
    excerpt: 'Control stock visibility, pricing, and fulfilment across channels without overcomplicating operations.',
    category: 'Retail',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Retail', [
      'Retail ERP success depends on disciplined item data and channel governance.',
      'Prioritise stock accuracy and fulfilment reliability before advanced analytics ambitions.',
      'Set margin guardrails by channel and promotion type.',
    ]),
  },
  {
    _id: 'post-bc-release-notes',
    _type: 'post',
    title: 'How to review Business Central release notes without creating project churn',
    slug: 'review-business-central-release-notes-without-project-churn',
    excerpt: 'A practical method to assess release impact and decide what to adopt now versus later.',
    category: 'Business Central',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Business Central', [
      'Do not treat every new feature as mandatory in the next sprint.',
      'Assess impact by business process, regression risk, and training overhead.',
      'Use a quarterly release governance forum with product owners and finance.',
    ]),
  },
  {
    _id: 'post-d365-sales-handoffs',
    _type: 'post',
    title: 'Where D365 Sales to ERP handovers usually break',
    slug: 'where-d365-sales-to-erp-handovers-usually-break',
    excerpt: 'Avoid quote-to-order leakage with explicit ownership, data standards, and exception handling.',
    category: 'CRM + ERP',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('CRM + ERP', [
      'Most handover issues come from unclear ownership and inconsistent commercial data.',
      'Define mandatory fields and approval checks before conversion to order.',
      'Create visible queues for failed synchronisation events.',
    ]),
  },
  {
    _id: 'post-implementation-methods',
    _type: 'post',
    title: 'Phased rollout vs big-bang ERP go-live: how to decide',
    slug: 'phased-rollout-vs-big-bang-erp-go-live',
    excerpt: 'A pragmatic decision framework based on risk tolerance, business readiness, and integration constraints.',
    category: 'Delivery Strategy',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Delivery Strategy', [
      'Big-bang can reduce transitional complexity but raises concentrated execution risk.',
      'Phased rollout de-risks adoption yet demands stronger interim process governance.',
      'Choose with explicit criteria, not internal preference alone.',
    ]),
  },
  {
    _id: 'post-change-management',
    _type: 'post',
    title: 'Change management that actually works in SMB ERP programmes',
    slug: 'change-management-that-works-smb-erp-programmes',
    excerpt: 'Practical communication, training, and adoption routines for lean organisations.',
    category: 'Change Management',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Change Management', [
      'In smaller organisations, informal behaviours can override formal process quickly.',
      'Use role-based training and manager-led reinforcement from week one.',
      'Track adoption with practical indicators, not training attendance alone.',
    ]),
  },
  {
    _id: 'post-finance-close',
    _type: 'post',
    title: 'Month-end close in new ERP: the first three cycles playbook',
    slug: 'month-end-close-new-erp-first-three-cycles-playbook',
    excerpt: 'Stabilise close performance through controlled reconciliation, ownership, and issue triage.',
    category: 'Finance',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarPostBlocks('month-end-close-new-erp-first-three-cycles-playbook'),
  },
  {
    _id: 'post-integration-architecture',
    _type: 'post',
    title: 'Integration architecture essentials for SMB ERP landscapes',
    slug: 'integration-architecture-essentials-smb-erp-landscapes',
    excerpt: 'Design integrations for reliability, supportability, and clear ownership from day one.',
    category: 'Architecture',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Architecture', [
      'Unowned integrations become silent operational risk after go-live.',
      'Document canonical data objects and system ownership per process.',
      'Design alerting so business users can act before customers are impacted.',
    ]),
  },
  {
    _id: 'post-vendor-demo-script',
    _type: 'post',
    title: 'Vendor demo script for ERP buyers: what to ask and what to avoid',
    slug: 'vendor-demo-script-erp-buyers-what-to-ask',
    excerpt: 'Use scenario scripts and scoring controls to keep demos comparable and decision-ready.',
    category: 'Selection',
    publishedAt,
    updatedAt: publishedAt,
    body: pillarPostBlocks('vendor-demo-script-erp-buyers-what-to-ask'),
  },
  {
    _id: 'post-partner-due-diligence',
    _type: 'post',
    title: 'Implementation partner due diligence: ten questions that matter',
    slug: 'implementation-partner-due-diligence-ten-questions',
    excerpt: 'Assess partner delivery capability, staffing model, and accountability before signing.',
    category: 'Partner Selection',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Partner Selection', [
      'Ask who will actually deliver your programme, not only who presents in sales meetings.',
      'Request recent references matching your industry and complexity profile.',
      'Probe assumptions on scope boundaries and change request handling.',
    ]),
  },
  {
    _id: 'post-data-quality-ownership',
    _type: 'post',
    title: 'Data quality ownership model for ERP programmes',
    slug: 'data-quality-ownership-model-erp-programmes',
    excerpt: 'A practical operating model to assign data ownership and reduce migration defects.',
    category: 'Data',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Data', [
      'Data quality is a business accountability supported by technology, not an IT-only task.',
      'Assign data stewards by domain and require measurable quality thresholds.',
      'Track defects to source process owners to prevent recurrence.',
    ]),
  },
  {
    _id: 'post-licensing-cost-control',
    _type: 'post',
    title: 'ERP licensing and support cost control for growing organisations',
    slug: 'erp-licensing-and-support-cost-control-growing-organisations',
    excerpt: 'Avoid budget blowouts with role-based licensing, utilisation reviews, and support governance.',
    category: 'Commercial',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Commercial', [
      'Licensing costs drift when role definitions are vague and access is over-provisioned.',
      'Review licence assignment quarterly and align with actual usage patterns.',
      'Separate break-fix support from enhancement demand to manage spend transparently.',
    ]),
  },
  {
    _id: 'post-bau-roadmap',
    _type: 'post',
    title: 'From project to BAU: setting an ERP improvement roadmap',
    slug: 'from-project-to-bau-setting-erp-improvement-roadmap',
    excerpt: 'Structure post-implementation improvements around measurable value and delivery capacity.',
    category: 'Optimisation',
    publishedAt,
    updatedAt: publishedAt,
    body: detailedPostBlocks('Optimisation', [
      'Without a roadmap, improvement work turns into ad hoc requests with weak business value.',
      'Create quarterly release trains with prioritisation criteria agreed by leadership.',
      'Track realised value per release to sustain executive support.',
    ]),
  },
]
