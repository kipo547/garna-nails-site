export async function onRequestPost(context) {
  const password = String(context.request.headers.get("x-admin-password") || "").trim();
  const realPassword = String(context.env.ADMIN_PASSWORD || "").trim();

  if (!realPassword) {
    return new Response("ADMIN_PASSWORD is missing in Cloudflare variables", {
      status: 500,
    });
  }

  if (password !== realPassword) {
    return new Response("Wrong password", {
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
