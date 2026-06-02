export async function onRequestGet({ env }) {
  const data = await env.KV.get("products", { type: "json" }) || []
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  })
}

export async function onRequestPost({ request, env }) {
  const body = await request.json()
  const list = await env.KV.get("products", { type: "json" }) || []
  list.push(body)
  await env.KV.put("products", JSON.stringify(list))
  return new Response("OK")
}
