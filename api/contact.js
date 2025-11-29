
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, phone, product, quantity, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;
  if (!SMTP_USER || !SMTP_PASS) return res.status(500).json({ error: 'SMTP not configured' });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  const subject = `Website Enquiry: ${product || 'Product Enquiry'}`;
  const bodyText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nProduct: ${product || 'N/A'}\nQuantity: ${quantity || 'N/A'}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: `${name} <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject,
      text: bodyText,
      html: bodyText.replace(/\n/g,'<br>')
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Mail error', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
