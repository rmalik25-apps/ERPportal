import type {APIRoute} from 'astro'

function getSiteOrigin(url: URL) {
  const configured = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'
  return configured.endsWith('/') ? configured.slice(0, -1) : new URL(configured, url).toString().replace(/\/$/, '')
}

export const GET: APIRoute = ({url}) => {
  const origin = getSiteOrigin(url)
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

