export async function onRequestPost(context) {
  const password = context.request.headers.get("x-admin-password");

  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(context.request.url);
  const contentUrl = `${url.origin}/data/admin-content.json`;

  const res = await fetch(contentUrl);
  const data = await res.text();

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
