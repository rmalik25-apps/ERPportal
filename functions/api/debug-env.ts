interface Env {
  ASSESSMENT_WEBHOOK_URL?: string
  NEWSLETTER_WEBHOOK_URL?: string
  GOOGLE_APPS_SCRIPT_URL?: string
  LEAD_WEBHOOK_SHARED_SECRET?: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const body = {
    ok: true,
    env: {
      ASSESSMENT_WEBHOOK_URL: Boolean(context.env.ASSESSMENT_WEBHOOK_URL),
      NEWSLETTER_WEBHOOK_URL: Boolean(context.env.NEWSLETTER_WEBHOOK_URL),
      GOOGLE_APPS_SCRIPT_URL: Boolean(context.env.GOOGLE_APPS_SCRIPT_URL),
      LEAD_WEBHOOK_SHARED_SECRET: Boolean(context.env.LEAD_WEBHOOK_SHARED_SECRET),
    },
  }

  return new Response(JSON.stringify(body), {
    headers: {'content-type': 'application/json; charset=utf-8'},
  })
}
