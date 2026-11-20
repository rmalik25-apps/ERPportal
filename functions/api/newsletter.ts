interface Env {
  BREVO_API_KEY?: string
  BREVO_LIST_ID?: string
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
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

export const onRequestGet: PagesFunction = async () => json({ok: false, error: 'Not found'}, 404)

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
  const brevoKey = context.env.BREVO_API_KEY
  const listId = Number(context.env.BREVO_LIST_ID)
  if (brevoKey && (!Number.isSafeInteger(listId) || listId <= 0)) {
    return json({ok: false, error: 'Newsletter list not configured'}, 500)
  }
  if (!brevoKey && !upstream) return json({ok: false, error: 'Newsletter not configured'}, 500)

  if (brevoKey) {
    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {'api-key': brevoKey, 'Content-Type': 'application/json'},
        // Do not reset blacklist flags: a repeat signup must not undo an unsubscribe.
        body: JSON.stringify({email, listIds: [listId], updateEnabled: true}),
        signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) {
        console.error('Newsletter contact sync failed', response.status)
        return json({ok: false, error: 'Subscription unavailable. Please try again shortly.'}, 502)
      }
    } catch {
      return json({ok: false, error: 'Subscription unavailable. Please try again shortly.'}, 502)
    }
  }

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

  if (!upstream) return json({ok: true})

  const relay = async () => {
    const response = await fetch(upstream, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(relayPayload),
      signal: AbortSignal.timeout(10000),
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
  }

  if (brevoKey) {
    // Brevo is the subscription record; a backup notification failure must not
    // tell a successfully subscribed visitor to submit again.
    context.waitUntil(relay().then((response) => {
      if (!response.ok) console.error('Newsletter backup relay failed', response.status)
    }).catch(() => console.error('Newsletter backup relay unavailable')))
    return json({ok: true})
  }

  try {
    return await relay()
  } catch {
    return json({ok: false, error: 'Webhook request failed'}, 502)
  }
}
