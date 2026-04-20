const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
const sendResultEmail = async ({ name, email, wpm, accuracy, correctWords, errors, wordsTyped, passed }) => {
  const statusLabel = passed ? "PASSED" : "FAILED";
  const statusColor = passed ? "#3b6d11" : "#a32d2d";
  const statusBg = passed ? "#eaf3de" : "#fcebeb";
  const html = `<div style="font-family:sans-serif;max-width:560px;margin:auto">
    <div style="background:#1a1714;padding:24px 32px;border-radius:12px 12px 0 0">
      <h2 style="color:#f5f2ed;margin:0">Typing Test Submission</h2>
      <p style="color:#888;margin:4px 0 0;font-size:13px">Evolve Vue Pvt. Ltd.</p>
    </div>
    <div style="border:1px solid #e2ddd8;border-top:none;padding:28px 32px;border-radius:0 0 12px 12px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#6b6560;width:40%">Name</td><td style="font-weight:600">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">Email</td><td>${email}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">WPM</td><td style="font-size:22px;font-weight:700">${wpm}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">Accuracy</td><td>${accuracy}%</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">Correct words</td><td>${correctWords}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">Errors</td><td>${errors}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6560">Status</td>
          <td><span style="padding:4px 14px;border-radius:99px;background:${statusBg};color:${statusColor};font-weight:600">${statusLabel}</span></td>
        </tr>
      </table>
    </div>
  </div>`;
  await transporter.sendMail({
    from: `"Evolve Vue Typing Test" <${process.env.SMTP_USER}>`,
    to: [process.env.HR_EMAIL_1, process.env.HR_EMAIL_2].join(","),
    replyTo: email,
    subject: `Typing Test — ${name} | ${wpm} WPM | ${statusLabel}`,
    html,
  });
};
module.exports = { sendResultEmail };
