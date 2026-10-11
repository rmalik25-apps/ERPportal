export const onRequest: PagesFunction = async ({request, next}) => {
  const url = new URL(request.url)
  const isProductionHost = url.hostname === 'erpsearch.com.au' || url.hostname === 'www.erpsearch.com.au'
  const shouldRedirectToCanonicalOrigin = isProductionHost && (url.hostname === 'www.erpsearch.com.au' || url.protocol === 'http:')

  if (shouldRedirectToCanonicalOrigin) {
    url.hostname = 'erpsearch.com.au'
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  const response = await next()
  if (!url.pathname.startsWith('/api/')) return response

  const headers = new Headers(response.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
