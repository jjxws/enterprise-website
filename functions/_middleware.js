export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) {
    const auth = request.headers.get('Authorization') || '';
    // 不严格匹配，避免大小写/空格问题
    if (!auth.includes('ok')) {
      return new Response('Unauthorized', { status: 401 });
    }
  }
  return next();
}
