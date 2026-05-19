export async function onRequestPost(context) {
  const password = context.request.headers.get("x-admin-password");

  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized: wrong admin password", {
      status: 401,
    });
  }

  try {
    const url = new URL(context.request.url);
    const contentUrl = `${url.origin}/data/admin-content.json`;

    const res = await fetch(contentUrl);

    if (!res.ok) {
      return new Response("Cannot load data/admin-content.json", {
        status: 500,
      });
    }

    const text = await res.text();

    try {
      JSON.parse(text);
    } catch (error) {
      return new Response("admin-content.json is broken JSON", {
        status: 500,
      });
    }

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Server error: " + error.message, {
      status: 500,
    });
  }
}
