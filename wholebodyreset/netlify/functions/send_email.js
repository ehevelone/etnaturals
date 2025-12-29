exports.handler = async (event) => {
  // basic safety
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "POST only" })
    };
  }

  // pull values from Netlify (already added)
  const API_KEY = process.env.MAILERLITE_API_KEY;
  const FROM = process.env.EMAIL_FROM || "support@etnaturals.com";

  // temporary test email (YOUR address)
  const testEmail = "support@etnaturals.com";

  const payload = {
    email: testEmail,
    fields: {
      subject: "MailerLite test",
      content: "This is a test from Netlify send_email."
    }
  };

  try {
    const res = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY
      },
      body: JSON.stringify(payload)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, mailerlite: "called" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "mailer failed" })
    };
  }
};
