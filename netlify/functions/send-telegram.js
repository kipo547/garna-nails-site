exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Telegram settings are missing",
        }),
      };
    }

    if (!data.name || !data.contact || !data.service) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Required fields are missing",
        }),
      };
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
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Telegram sending error",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server error",
      }),
    };
  }
};