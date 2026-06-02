export async function onRequest({request,next}){
  const url=new URL(request.url);
  if(url.pathname.startsWith('/api/')){
    const auth=request.headers.get('Authorization');
    if(auth!=='ok') return new Response('Unauthorized',{status:401});
  }
  return next();
}