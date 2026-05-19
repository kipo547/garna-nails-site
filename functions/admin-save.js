export async function onRequestPost(context) {
  const password = context.request.headers.get("x-admin-password");

  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized: wrong admin password", { status: 401 });
  }

  try {
    const body = await context.request.json();

    const repo = context.env.GITHUB_REPO;
    const branch = context.env.GITHUB_BRANCH || "main";
    const token = context.env.GITHUB_TOKEN;
    const filePath = "data/admin-content.json";

    if (!repo) {
      return new Response("Missing GITHUB_REPO", { status: 500 });
    }

    if (!token) {
      return new Response("Missing GITHUB_TOKEN", { status: 500 });
    }

    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;

    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "garna-nails-admin"
      }
    });

    if (!getRes.ok) {
      const errorText = await getRes.text();
      return new Response("Cannot read admin-content.json: " + errorText, {
        status: 500
      });
    }

    const currentFile = await getRes.json();

    const jsonText = JSON.stringify(body, null, 2);
    const content = btoa(unescape(encodeURIComponent(jsonText)));

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
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
      return new Response("Cannot save content: " + errorText, {
        status: 500
      });
    }

    return new Response(JSON.stringify({ message: "Saved" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response("Server error: " + error.message, {
      status: 500
    });
  }
}
