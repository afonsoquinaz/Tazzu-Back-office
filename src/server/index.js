require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
// const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

// const logoURL = path.join(__dirname, '/logo-white.jpg');
// const logoBuffer = fs.readFileSync(logoURL);
// const base64Logo = logoBuffer.toString('base64');

function getEmailContent(status, orderId) {
  switch (status.toLowerCase()) {
    case 'picked':
      return `
        <h1 style="color: #444;">Order Update: Items Picked!</h1>
        <p style="color: #555;">Hi there!</p>
        <p style="color: #555;">We're excited to let you know that the items in your T A Z Z U order (id: ${orderId}) have been picked and are now being prepared for shipment.</p>
        <p style="color: #555;">Stay tuned for more updates from us. We appreciate your patience and support.</p>
        <p style="color: #555;">You can track your order by clicking the following link: <a href="https://tazzu.net/tracking?order_id=${orderId}" target="_blank">Track my order</a>. We'll continue to provide you with further updates on your order's progress.</p>
        <p style="color: #555;">Thank you for choosing T A Z Z U. We strive to provide you with the best service and look forward to serving you again in the future.</p>
      `;
    case 'sent':
      return `
        <h1 style="color: #444;">Order Update: On its way to you!</h1>
        <p style="color: #555;">Hi there!</p>
        <p style="color: #555;">We're excited to inform you that your T A Z Z U order (id: ${orderId}) has been sent and is on its way to you.</p>
        <p style="color: #555;">Stay tuned for more updates from us. We appreciate your patience and support.</p>
        <p style="color: #555;">You can track your order by clicking the following link: <a href="https://tazzu.net/tracking?order_id=${orderId}" target="_blank">Track my order</a>. We'll continue to provide you with further updates on your order's progress.</p>
        <p style="color: #555;">Thank you for choosing T A Z Z U. We strive to provide you with the best service and look forward to serving you again in the future.</p>
      `;
    case 'success':
      return `
        <h1 style="color: #444;">Order Update: Delivered & Completed!</h1>
        <p style="color: #555;">Hi there!</p>
        <p style="color: #555;">We're thrilled that your T A Z Z U order (id: ${orderId}) has been successfully delivered and completed!</p>
        <p style="color: #555;">We'd love to hear about your experience with T A Z Z U. Share your excitement with us on social media!</p>
        <p style="color: #555;">Thank you once again for choosing T A Z Z U. We can't wait to see your photos and look forward to serving you again in the future.</p>
      `;
    default:
      console.log('Order Status not recognized!');
      return '';
  }
}

function getSocialMediaIcons() {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 50px; margin-left: auto; margin-right: auto;">
      <tr>
        <td>
          <a href="https://www.facebook.com/profile.php?id=100094491291666" target="_blank" style="margin-right: 10px">
            <img src="https://cdn-icons-png.flaticon.com/512/20/20837.png" alt="Facebook" style="width: 15px; height: 15px;">
          </a>
        </td>
        <td>
          <a href="https://www.instagram.com/tazzu.clothing/" target="_blank" style="margin-right: 10px">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png" alt="Instagram" style="width: 15px; height: 15px;">
          </a>
        </td>
        <td>
          <a href="https://www.tiktok.com/@tazzu.clothing" target="_blank" style="margin-right: 10px">
            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046120.png" alt="TikTok" style="width: 15px; height: 15px;">
          </a>
        </td>
        <td>
          <a href="https://www.linkedin.com/company/tazzu/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111532.png" alt="LinkedIn" style="width: 15px; height: 15px;">
          </a>
        </td>
      </tr>
    </table>
  `;
}

app.post("/send-email", async (req, res) => {
  const { email, subject, text, orderId } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // GoDaddy's outgoing SMTP server
    secure: false, // true for 465, false for other ports
    port: 587,
    auth: {
      user: "contact@tazzu.net", // your GoDaddy email
      pass: "TiagoAfonso1.", // your GoDaddy password
    },
  });

  // Email template for "Sent" state
  let mailOptions = {
    from: `"T A Z Z U" <contact@tazzu.net>`,
    to: email,
    subject: subject + ' - ' + orderId,
    html: `
      <div style="background-color: #f9f9f9; padding: 50px;">
        ${getEmailContent(text, orderId)}
        <p style="color: #555;"><strong>The T A Z Z U Team</strong></p>

        ${getSocialMediaIcons()}
      </div>
    `,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log("Transporter Error: ", error);
    } else {
      console.log("Server is ready to take messages");
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("sendMail Error: ", error);
      res
        .status(500)
        .json({ status: "error", message: "Failed to send the email." });
    } else {
      console.log("Message sent: %s", info.messageId);
      res
        .status(200)
        .json({ status: "success", message: "Email sent successfully." });
    }
  });
});

app.use('/download-image', createProxyMiddleware({
  target: 'https://firebasestorage.googleapis.com',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
  },
  pathRewrite: {
    "^/download-image": "", // Remove the '/image' path prefix
  },
}));

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
