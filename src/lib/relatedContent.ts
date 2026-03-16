type RelatedLink = {
  href: string
  label: string
}

const guideLinks: Record<string, RelatedLink[]> = {
  'erp-selection-checklist-smb': [
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite for growing businesses'},
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
    {href: '/compare/business-central-vs-acumatica-distribution-project-services/', label: 'Business Central vs Acumatica'},
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
}

const comparisonLinks: Record<string, RelatedLink[]> = {
  'business-central-vs-netsuite-growing-businesses': [
    {href: '/guides/erp-selection-checklist-smb/', label: 'ERP selection checklist'},
    {href: '/guides/how-to-choose-erp-implementation-partner/', label: 'How to choose an ERP implementation partner'},
    {href: '/blog/vendor-demo-script-erp-buyers-what-to-ask/', label: 'Vendor demo script for ERP buyers'},
  ],
  'netsuite-vs-sage-intacct-finance-first-teams': [
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/blog/month-end-close-new-erp-first-three-cycles-playbook/', label: 'Month-end close playbook'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite'},
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
    {href: '/blog/implementation-partner-due-diligence-ten-questions/', label: 'Implementation partner due diligence'},
    {href: '/compare/business-central-vs-netsuite-growing-businesses/', label: 'Business Central vs NetSuite'},
  ],
  'month-end-close-new-erp-first-three-cycles-playbook': [
    {href: '/guides/erp-finance-design-chart-accounts-dimensions/', label: 'Finance design guide'},
    {href: '/compare/netsuite-vs-sage-intacct-finance-first-teams/', label: 'NetSuite vs Sage Intacct'},
    {href: '/guides/post-go-live-stabilisation-plan-first-90-days/', label: 'Post-go-live stabilisation plan'},
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
