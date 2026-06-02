export async function onRequestGet({ env }) {
  const data = await env.KV.get("news", { type: "json" }) || [];
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  
  if (body.del === 1) {
    const idx = body.idx;
    const list = await env.KV.get("news", { type: "json" }) || [];
    list.splice(idx, 1);
    await env.KV.put("news", JSON.stringify(list));
    return new Response("OK");
  }

  const list = await env.KV.get("news", { type: "json" }) || [];
  list.push(body);
  await env.KV.put("news", JSON.stringify(list));
  return new Response("OK");
}
