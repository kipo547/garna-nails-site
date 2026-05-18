export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        message: "Telegram settings are missing",
      });
    }

    if (!data.name || !data.contact || !data.service) {
      return res.status(400).json({
        message: "Required fields are missing",
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

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
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
      return res.status(500).json({
        message: "Telegram sending error",
      });
    }

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}
