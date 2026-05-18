export async function onRequestPost(context) {
  const password = context.request.headers.get("x-admin-password");

  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await context.request.json();

    const repo = context.env.GITHUB_REPO;
    const branch = context.env.GITHUB_BRANCH || "main";
    const token = context.env.GITHUB_TOKEN;
    const filePath = "data/admin-content.json";

    if (!repo || !token) {
      return new Response("GitHub settings missing", { status: 500 });
    }

    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;

    const getRes = await fetch(getUrl, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "User-Agent": "garna-nails-admin"
      }
    });

    if (!getRes.ok) {
      return new Response("Cannot read file from GitHub", { status: 500 });
    }

    const currentFile = await getRes.json();

    const content = btoa(unescape(encodeURIComponent(JSON.stringify(body, null, 2))));

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "garna-nails-admin"
      },
      body: JSON.stringify({
        message: "Update site content from admin",
        content,
        sha: currentFile.sha,
        branch
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      return new Response(errorText, { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Saved" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
