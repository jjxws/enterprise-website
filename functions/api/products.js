export async function onRequest({env,request}){
  const KEY='products';
  let data=JSON.parse(await env.KV.get(KEY)||'[]');

  if(request.method==='GET'){
    return new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}});
  }
  if(request.method==='POST'){
    const item=await request.json();
    data.push(item);
    await env.KV.put(KEY,JSON.stringify(data));
    return new Response('ok');
  }
  if(request.method==='DELETE'){
    const url=new URL(request.url);
    const idx=parseInt(url.searchParams.get('idx'));
    data.splice(idx,1);
    await env.KV.put(KEY,JSON.stringify(data));
    return new Response('ok');
  }
}