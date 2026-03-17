interface Env {
  POLL_WEBHOOK_URL?: string
  GOOGLE_APPS_SCRIPT_URL?: string
  LEAD_WEBHOOK_SHARED_SECRET?: string
}

type PollPayload = {
  type: 'poll'
  option?: string
  page?: string
  submittedAt?: string
}

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

function getUpstream(env: Env) {
  return env.POLL_WEBHOOK_URL || env.GOOGLE_APPS_SCRIPT_URL
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const upstream = getUpstream(context.env)
  if (!upstream) return json({ok: false, error: 'Webhook not configured'}, 500)

  const url = new URL(upstream)
  url.searchParams.set('action', 'poll-results')

  try {
    const response = await fetch(url.toString())
    const upstreamBody = (await response.json().catch(() => null)) as Record<string, unknown> | null

    if (!response.ok) return json({ok: false, error: String(upstreamBody?.error || 'Upstream webhook failed')}, 502)
    if (upstreamBody && upstreamBody.ok === false) {
      return json({ok: false, error: String(upstreamBody.error || 'Upstream webhook failed')}, 502)
    }

    return json({ok: true, results: upstreamBody?.results || {total: 0, options: []}})
  } catch {
    return json({ok: false, error: 'Webhook request failed'}, 502)
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const payload = (await parseJson(context.request)) as PollPayload | null
  if (!payload) return json({ok: false, error: 'Invalid JSON payload'}, 400)

  const option = asText(payload.option, 160)
  const page = asText(payload.page, 800)
  const submittedAt = asText(payload.submittedAt, 50) || new Date().toISOString()

  if (!option) return json({ok: false, error: 'Missing poll option'}, 400)

  const upstream = getUpstream(context.env)
  if (!upstream) return json({ok: false, error: 'Webhook not configured'}, 500)

  const relayPayload: Record<string, string> = {
    type: 'poll',
    option,
    page,
    submittedAt,
    relayPath: '/api/poll',
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

    const upstreamBody = (await response.json().catch(() => null)) as Record<string, unknown> | null

    if (!response.ok) return json({ok: false, error: String(upstreamBody?.error || 'Upstream webhook failed')}, 502)
    if (upstreamBody && upstreamBody.ok === false) {
      return json({ok: false, error: String(upstreamBody.error || 'Upstream webhook failed')}, 502)
    }

    return json({ok: true, results: upstreamBody?.results || {total: 0, options: []}})
  } catch {
    return json({ok: false, error: 'Webhook request failed'}, 502)
  }
}
