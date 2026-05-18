export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const token = context.env.TELEGRAM_BOT_TOKEN;
    const chatId = context.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(JSON.stringify({ message: "Telegram settings are missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!data.name || !data.contact || !data.service) {
      return new Response(JSON.stringify({ message: "Required fields are missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const text = `
Нова заявка з сайту garna_nails ✨

Ім'я: ${data.name}
Контакт: ${data.contact}
Послуга: ${data.service}

Повідомлення:
${data.message || "Без повідомлення"}
`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      return new Response(JSON.stringify({ message: "Telegram sending error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
