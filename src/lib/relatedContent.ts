type RelatedLink = {
  href: string
  label: string
}

const guideLinks: Record<string, RelatedLink[]> = {
  'erp-selection-checklist-smb': [
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite for growing businesses'},
    {href: '/compare/odoo-vs-business-central/', label: 'Odoo vs Business Central'},
    {href: '/blog/vendor-demo-script-erp-buyers-what-to-ask/', label: 'Vendor demo script for ERP buyers'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
  ],
  'navision-to-business-central-migration': [
    {href: '/compare/nav-technical-upgrade-vs-full-reimplementation/', label: 'NAV technical upgrade vs full reimplementation'},
    {href: '/guides/erp-data-migration-playbook-clean-cutover/', label: 'ERP data migration playbook for clean cutover'},
    {href: '/blog/review-business-central-release-notes-without-project-churn/', label: 'How to review Business Central release notes'},
  ],
  'business-central-implementation-wholesale-distribution': [
    {href: '/blog/seven-erp-red-flags-distributors-before-contract-signing/', label: 'Seven ERP red flags for distributors'},
    {href: '/guides/warehouse-process-redesign-before-erp-go-live/', label: 'Warehouse process redesign before ERP go-live'},
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/compare/business-central-vs-acumatica-distribution-project-services/', label: 'Business Central vs Acumatica'},
  ],
  'business-central-pricing-australia-licences-budget': [
    {href: '/guides/odoo-pricing-australia-standard-vs-custom/', label: 'Odoo pricing in Australia'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite for growing businesses'},
    {href: '/compare/odoo-vs-business-central/', label: 'Odoo vs Business Central'},
    {href: '/blog/erp-licensing-and-support-cost-control-growing-organisations/', label: 'ERP licensing and support cost control'},
    {href: '/blog/business-central-payables-agent-australia-what-to-test/', label: 'Business Central Payables Agent in Australia'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
  ],
  'odoo-pricing-australia-standard-vs-custom': [
    {href: '/compare/odoo-vs-business-central/', label: 'Odoo vs Business Central'},
    {href: '/compare/odoo-vs-netsuite/', label: 'Odoo vs NetSuite'},
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
    {href: '/guides/erp-customisations-governance-guide/', label: 'ERP customisations guide'},
  ],
  'd365-sales-business-central-integration-guide': [
    {href: '/blog/where-d365-sales-to-erp-handovers-usually-break/', label: 'Where D365 Sales to ERP handovers usually break'},
    {href: '/compare/integrated-erp-crm-vs-best-of-breed-stack/', label: 'Integrated ERP+CRM vs best-of-breed stack'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
  ],
  'how-to-choose-erp-implementation-partner': [
    {href: '/blog/implementation-partner-due-diligence-ten-questions/', label: 'Implementation partner due diligence'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist'},
    {href: '/blog/vendor-demo-script-erp-buyers-what-to-ask/', label: 'Vendor demo script for ERP buyers'},
  ],
  'how-to-run-erp-rfp': [
    {href: '/guides/is-erp-rfp-really-required/', label: 'Is an ERP RFP really required?'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
    {href: '/blog/vendor-demo-script-erp-buyers-what-to-ask/', label: 'Vendor demo script for ERP buyers'},
  ],
  'is-erp-rfp-really-required': [
    {href: '/guides/how-to-run-erp-rfp/', label: 'How to run an ERP RFP'},
    {href: '/guides/first-time-erp-buyers-roadmap/', label: 'First-time ERP buyers roadmap'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
  ],
  'what-is-an-erp-guide': [
    {href: '/guides/spreadsheet-to-erp-migration-guide/', label: 'Spreadsheet to ERP migration guide'},
    {href: '/guides/first-time-erp-buyers-roadmap/', label: 'First-time ERP buyer roadmap'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
  ],
  'spreadsheet-to-erp-migration-guide': [
    {href: '/guides/what-is-an-erp-guide/', label: 'What is an ERP?'},
    {href: '/guides/first-time-erp-buyers-roadmap/', label: 'First-time ERP buyer roadmap'},
    {href: '/compare/odoo-vs-business-central/', label: 'Odoo vs Business Central'},
  ],
  'first-time-erp-buyers-roadmap': [
    {href: '/guides/what-is-an-erp-guide/', label: 'What is an ERP?'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
    {href: '/guides/how-to-run-erp-rfp/', label: 'How to run an ERP RFP'},
  ],
  'industry-specific-erp-challenges-and-recommendations': [
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
    {href: '/compare/erp-for-meat-processing-generic-vs-specialist/', label: 'ERP for meat processing: generic vs specialist'},
    {href: '/compare/business-central-food-addons-vs-justfood/', label: 'Business Central food add-ons vs JustFood'},
  ],
  'erp-for-food-and-drink-manufacturing': [
    {href: '/guides/food-traceability-quality-and-recall-controls-in-erp/', label: 'Food ERP guide: traceability, quality, and recall controls'},
    {href: '/guides/formulation-yield-and-batch-production-in-food-erp/', label: 'Formulation, yield, and batch production in food ERP'},
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
  ],
  'food-traceability-quality-and-recall-controls-in-erp': [
    {href: '/guides/erp-for-food-and-drink-manufacturing/', label: 'ERP for food and drink manufacturing: what matters most'},
    {href: '/compare/business-central-food-addons-vs-justfood/', label: 'Business Central with food add-ons vs JustFood'},
    {href: '/compare/erp-for-meat-processing-generic-vs-specialist/', label: 'ERP for meat processing: generic vs specialist'},
  ],
  'formulation-yield-and-batch-production-in-food-erp': [
    {href: '/guides/erp-for-food-and-drink-manufacturing/', label: 'ERP for food and drink manufacturing: what matters most'},
    {href: '/guides/food-traceability-quality-and-recall-controls-in-erp/', label: 'Food ERP guide: traceability, quality, and recall controls'},
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
  ],
}

const comparisonLinks: Record<string, RelatedLink[]> = {
  'business-central-vs-netsuite-growing-businesses': [
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
    {href: '/blog/vendor-demo-script-erp-buyers-what-to-ask/', label: 'Vendor demo script for ERP buyers'},
  ],
  'netsuite-vs-sage-intacct-finance-first-teams': [
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/blog/month-end-close-new-erp-first-three-cycles-playbook/', label: 'Month-end close playbook'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite'},
  ],
  'myob-acumatica-vs-business-central': [
    {href: '/compare/sage-intacct-vs-myob-acumatica/', label: 'Sage Intacct vs MYOB Acumatica'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
  ],
  'odoo-vs-business-central': [
    {href: '/guides/odoo-pricing-australia-standard-vs-custom/', label: 'Odoo pricing in Australia'},
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/compare/odoo-vs-netsuite/', label: 'Odoo vs NetSuite'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite'},
    {href: '/guides/erp-customisations-governance-guide/', label: 'ERP customisations guide'},
  ],
  'generic-erp-vs-vertical-erp-food-manufacturers': [
    {href: '/compare/erp-for-meat-processing-generic-vs-specialist/', label: 'ERP for meat processing'},
    {href: '/compare/business-central-food-addons-vs-justfood/', label: 'Business Central food add-ons vs JustFood'},
    {href: '/guides/industry-specific-erp-challenges-and-recommendations/', label: 'Industry-specific ERP challenges'},
  ],
  'erp-for-meat-processing-generic-vs-specialist': [
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
    {href: '/compare/business-central-food-addons-vs-justfood/', label: 'Business Central food add-ons vs JustFood'},
    {href: '/guides/industry-specific-erp-challenges-and-recommendations/', label: 'Industry-specific ERP challenges'},
  ],
  'business-central-food-addons-vs-justfood': [
    {href: '/guides/erp-for-food-and-drink-manufacturing/', label: 'ERP for food and drink manufacturing: what matters most'},
    {href: '/guides/food-traceability-quality-and-recall-controls-in-erp/', label: 'Food ERP guide: traceability, quality, and recall controls'},
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
  ],
}

const blogLinks: Record<string, RelatedLink[]> = {
  'erp-priorities-professional-services-project-firms': [
    {href: '/compare/business-central-vs-acumatica-distribution-project-services/', label: 'Business Central vs Acumatica'},
    {href: '/guides/d365-sales-business-central-integration-guide/', label: 'D365 Sales + Business Central integration guide'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
  ],
  'vendor-demo-script-erp-buyers-what-to-ask': [
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist'},
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/blog/implementation-partner-due-diligence-ten-questions/', label: 'Implementation partner due diligence'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite'},
  ],
  'erp-licensing-and-support-cost-control-growing-organisations': [
    {href: '/guides/business-central-pricing-australia-licences-budget/', label: 'Business Central pricing in Australia'},
    {href: '/guides/odoo-pricing-australia-standard-vs-custom/', label: 'Odoo pricing in Australia'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
  ],
  'review-business-central-release-notes-without-project-churn': [
    {href: '/blog/business-central-payables-agent-australia-what-to-test/', label: 'Business Central Payables Agent in Australia'},
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/blog/month-end-close-new-erp-first-three-cycles-playbook/', label: 'Month-end close playbook'},
  ],
  'business-central-payables-agent-australia-what-to-test': [
    {href: '/blog/review-business-central-release-notes-without-project-churn/', label: 'How to review Business Central release notes'},
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/blog/month-end-close-new-erp-first-three-cycles-playbook/', label: 'Month-end close playbook'},
    {href: '/blog/erp-licensing-and-support-cost-control-growing-organisations/', label: 'ERP licensing and support cost control'},
  ],
  'month-end-close-new-erp-first-three-cycles-playbook': [
    {href: '/blog/business-central-payables-agent-australia-what-to-test/', label: 'Business Central Payables Agent in Australia'},
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/compare/netsuite-vs-sage-intacct-finance-first-teams/', label: 'NetSuite vs Sage Intacct'},
    {href: '/guides/post-go-live-stabilisation-plan-first-90-days/', label: 'Post-go-live stabilisation plan'},
  ],
  'implementation-partner-due-diligence-ten-questions': [
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist for SMBs'},
    {href: '/guides/how-to-run-erp-rfp/', label: 'How to run an ERP RFP'},
  ],
  'why-generic-erp-demos-miss-food-manufacturing-reality': [
    {href: '/guides/erp-for-food-and-drink-manufacturing/', label: 'ERP for food and drink manufacturing: what matters most'},
    {href: '/guides/food-traceability-quality-and-recall-controls-in-erp/', label: 'Food ERP guide: traceability, quality, and recall controls'},
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
  ],
  'food-erp-projects-scope-warehouse-quality-and-production-together': [
    {href: '/guides/warehouse-process-redesign-before-erp-go-live/', label: 'Warehouse process redesign before ERP go-live'},
    {href: '/guides/erp-for-food-and-drink-manufacturing/', label: 'ERP for food and drink manufacturing: what matters most'},
    {href: '/compare/business-central-food-addons-vs-justfood/', label: 'Business Central with food add-ons vs JustFood'},
  ],
  'erp-checklist-for-beverage-manufacturers': [
    {href: '/guides/formulation-yield-and-batch-production-in-food-erp/', label: 'Formulation, yield, and batch production in food ERP'},
    {href: '/guides/food-traceability-quality-and-recall-controls-in-erp/', label: 'Food ERP guide: traceability, quality, and recall controls'},
    {href: '/compare/generic-erp-vs-vertical-erp-food-manufacturers/', label: 'Generic ERP vs vertical ERP for food manufacturers'},
  ],
}

export function getRelatedGuideLinks(slug?: string) {
  return (slug && guideLinks[slug]) || []
}

export function getRelatedComparisonLinks(slug?: string) {
  return (slug && comparisonLinks[slug]) || []
}

export function getRelatedBlogLinks(slug?: string) {
  return (slug && blogLinks[slug]) || []
}
