require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.json());
app.use(cors());

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

  let mailOptions = {
    from: `"T A Z Z U" <contact@tazzu.net>`, // sender address
    to: email, // receiver email
    subject: subject, // Subject line
    html: `
    <div style="background-color: #f9f9f9; padding: 50px;">
      <h1 style="color: #444;">Update on your TAZZU Order</h1>
      <p style="color: #555;">Your order was marked as ${text}.</p>
      <hr />
      <p style="color: #555;">Stay tuned for more updates from us. We appreciate your patience and support.</p>
      <p style="color: #555;">You can track your order by clicking the following link: <a href="https://tazzu.net/tracking?order_id=${orderId}" target="_blank">Track my order</a>. Stay tuned for further updates on your order. We appreciate your patience and support.</p>
      <hr />
      <p style="color: #555;">Thank you for choosing T A Z Z U. We strive to provide you with the best service and look forward to serving you again in the future.</p>
      <p style="color: #555;"><strong>T A Z Z U Team</strong></p>
    </div>`, // HTML body content
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
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
  },
  pathRewrite: {
    "^/download-image": "", // Remove the '/image' path prefix
  },
}));


app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
