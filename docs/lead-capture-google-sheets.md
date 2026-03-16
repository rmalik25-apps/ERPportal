# Lead Capture Setup (Cloudflare Pages Functions -> Google Apps Script -> Google Sheet)

This project now uses the architecture:

`Website -> /api/* (Cloudflare Pages Functions) -> Google Apps Script Web App -> Google Sheet`

The frontend posts to:

- `/api/assessment`
- `/api/newsletter`

Those endpoints validate input and relay to Apps Script.

## 1) Create the Google Sheet

Create one spreadsheet with two tabs:

- `AssessmentLeads`
- `NewsletterLeads`

Headers:

`AssessmentLeads`:

`submittedAt | email | phoneCountryCode | phoneNumber | companySize | projectType | priorities | page | relayAt | relayPath`

`NewsletterLeads`:

`submittedAt | email | page | relayAt | relayPath`

## 2) Create Apps Script Webhook

In the spreadsheet: `Extensions` -> `Apps Script`

Use this script:

```javascript
const ASSESSMENT_TAB = 'AssessmentLeads';
const NEWSLETTER_TAB = 'NewsletterLeads';
const SHARED_SECRET = ''; // optional: set same value as LEAD_WEBHOOK_SHARED_SECRET in Cloudflare

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    if (SHARED_SECRET && payload.relaySecret !== SHARED_SECRET) {
      return output({ok: false, error: 'Invalid relay secret'});
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    if (payload.type === 'assessment') {
      const tab = sheet.getSheetByName(ASSESSMENT_TAB);
      if (!tab) throw new Error('Missing AssessmentLeads tab');
      tab.appendRow([
        payload.submittedAt || new Date().toISOString(),
        payload.email || '',
        payload.phoneCountryCode || '',
        payload.phoneNumber || '',
        payload.companySize || '',
        payload.projectType || '',
        payload.priorities || '',
        payload.page || '',
        payload.relayAt || '',
        payload.relayPath || '',
      ]);
      return output({ok: true});
    }

    if (payload.type === 'newsletter') {
      const tab = sheet.getSheetByName(NEWSLETTER_TAB);
      if (!tab) throw new Error('Missing NewsletterLeads tab');
      tab.appendRow([
        payload.submittedAt || new Date().toISOString(),
        payload.email || '',
        payload.page || '',
        payload.relayAt || '',
        payload.relayPath || '',
      ]);
      return output({ok: true});
    }

    return output({ok: false, error: 'Invalid type'});
  } catch (error) {
    return output({ok: false, error: String(error)});
  }
}

function doGet() {
  return output({ok: true, service: 'lead-capture'});
}

function output(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy:

- `Deploy` -> `New deployment`
- Type: `Web app`
- Execute as: `Me`
- Who has access: `Anyone`
- Copy the `Web app URL`

## 3) Configure Cloudflare environment variables

In Cloudflare Pages project settings (`Settings` -> `Environment variables`), add:

- `GOOGLE_APPS_SCRIPT_URL` = your web app URL
- `LEAD_WEBHOOK_SHARED_SECRET` = optional secret string

Optional overrides:

- `ASSESSMENT_WEBHOOK_URL`
- `NEWSLETTER_WEBHOOK_URL`

If those are empty, both forms use `GOOGLE_APPS_SCRIPT_URL`.

## 4) Frontend endpoint config

Default frontend endpoints are already set to:

- `PUBLIC_ASSESSMENT_ENDPOINT=/api/assessment`
- `PUBLIC_NEWSLETTER_ENDPOINT=/api/newsletter`

You generally do not need to change these.

## 5) Cloudflare Pages build settings

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `web`

## 6) Local development note

`astro dev` does not run Cloudflare Pages Functions directly.

For local UI testing, forms will show an error unless you set temporary public endpoints.
In production on Cloudflare Pages, `/api/assessment` and `/api/newsletter` will work.
