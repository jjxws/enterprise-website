export async function onRequestGet({ env }) {
  const data = await env.KV.get("products", { type: "json" }) || [];
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  
  // 如果传了 del=1，执行删除
  if (body.del === 1) {
    const idx = body.idx;
    const list = await env.KV.get("products", { type: "json" }) || [];
    list.splice(idx, 1);
    await env.KV.put("products", JSON.stringify(list));
    return new Response("OK");
  }

  // 正常添加
  const list = await env.KV.get("products", { type: "json" }) || [];
  list.push(body);
  await env.KV.put("products", JSON.stringify(list));
  return new Response("OK");
}
