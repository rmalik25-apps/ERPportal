interface Env {
  NEWSLETTER_WEBHOOK_URL?: string
  GOOGLE_APPS_SCRIPT_URL?: string
  LEAD_WEBHOOK_SHARED_SECRET?: string
}

type NewsletterPayload = {
  type: 'newsletter'
  email?: string
  page?: string
  submittedAt?: string
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'content-type': 'application/json; charset=utf-8'},
  })
}

function asText(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

async function parseJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return null
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const payload = (await parseJson(context.request)) as NewsletterPayload | null
  if (!payload) return json({ok: false, error: 'Invalid JSON payload'}, 400)

  const website = asText(payload.website, 120)
  if (website) return json({ok: true}) // honeypot

  const email = asText(payload.email, 320).toLowerCase()
  const page = asText(payload.page, 800)
  const submittedAt = asText(payload.submittedAt, 50) || new Date().toISOString()

  if (!EMAIL_RE.test(email)) return json({ok: false, error: 'Invalid email'}, 400)

  const upstream = context.env.NEWSLETTER_WEBHOOK_URL || context.env.GOOGLE_APPS_SCRIPT_URL
  if (!upstream) return json({ok: false, error: 'Webhook not configured'}, 500)

  const relayPayload: Record<string, string> = {
    type: 'newsletter',
    email,
    page,
    submittedAt,
    relayPath: '/api/newsletter',
    relayAt: new Date().toISOString(),
  }

  if (context.env.LEAD_WEBHOOK_SHARED_SECRET) {
    relayPayload.relaySecret = context.env.LEAD_WEBHOOK_SHARED_SECRET
  }

  try {
    const response = await fetch(upstream, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(relayPayload),
    })

    let upstreamBody: Record<string, unknown> | null = null
    try {
      upstreamBody = await response.json()
    } catch {
      upstreamBody = null
    }

    if (!response.ok) return json({ok: false, error: String(upstreamBody?.error || 'Upstream webhook failed')}, 502)
    if (upstreamBody && upstreamBody.ok === false) {
      return json({ok: false, error: String(upstreamBody.error || 'Upstream webhook failed')}, 502)
    }

    return json({ok: true})
  } catch {
    return json({ok: false, error: 'Webhook request failed'}, 502)
  }
}
