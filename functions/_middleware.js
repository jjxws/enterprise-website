export async function onRequest({request,next}){
  const url = new URL(request.url);
  if(url.pathname.startsWith("/api/")){
    const auth = request.headers.get("Authorization");
    if(auth !== "admin_ok") return new Response("禁止访问",{status:401})
  }
  return next();
}
