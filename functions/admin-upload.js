export async function onRequestPost(context) {
  const password = context.request.headers.get("x-admin-password");

  if (password !== context.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await context.request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response("No file", { status: 400 });
    }

    const repo = context.env.GITHUB_REPO;
    const branch = context.env.GITHUB_BRANCH || "main";
    const token = context.env.GITHUB_TOKEN;

    if (!repo || !token) {
      return new Response("GitHub settings missing", { status: 500 });
    }

    const fileName = `${Date.now()}-${file.name}`.replaceAll(" ", "-");
    const filePath = `assets/images/uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    const content = btoa(binary);

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "garna-nails-admin"
      },
      body: JSON.stringify({
        message: "Upload image from admin",
        content,
        branch
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      return new Response(errorText, { status: 500 });
    }

    return new Response(JSON.stringify({
      path: filePath
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
