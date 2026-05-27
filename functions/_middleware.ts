export const onRequest: PagesFunction = async ({request, next}) => {
  const url = new URL(request.url)

  if (url.hostname === 'www.erpsearch.com.au') {
    url.hostname = 'erpsearch.com.au'
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  return next()
}
