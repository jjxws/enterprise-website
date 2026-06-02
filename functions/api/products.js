export async function onRequest({ env, request }) {
  const KEY = 'products';
  let data;
  try {
    data = JSON.parse(await env.KV.get(KEY) || '[]');
  } catch (e) {
    return new Response('KV read error', { status: 500 });
  }

  if (request.method === 'GET') {
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (request.method === 'POST') {
    try {
      const item = await request.json();
      data.push(item);
      await env.KV.put(KEY, JSON.stringify(data));
      return new Response('ok');
    } catch (e) {
      return new Response('KV write error: ' + e.message, { status: 500 });
    }
  }

  if (request.method === 'DELETE') {
    try {
      const url = new URL(request.url);
      const idx = parseInt(url.searchParams.get('idx'));
      data.splice(idx, 1);
      await env.KV.put(KEY, JSON.stringify(data));
      return new Response('ok');
    } catch (e) {
      return new Response('KV delete error: ' + e.message, { status: 500 });
    }
  }
}
