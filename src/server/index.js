const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { email, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tazzucontact@gmail.com", // your gmail account
      pass: "qdnstpqbondfvakz", // your gmail password
    },
  });

  let mailOptions = {
    from: '"T A Z Z U" <tazzucontact@gmail.com>', // sender address
    to: email, // receiver email
    subject: subject, // Subject line
    html: `
    <div style="background-color: #f9f9f9; padding: 50px;">
      <h1 style="color: #444;">Update on Your Trip</h1>
      <p style="color: #555;">${text}</p>
      <hr />
      <p style="color: #555;">Stay tuned for more updates from us. We appreciate your patience and support.</p>
      <hr />
      <p style="color: #555;">Thank you for choosing T A Z Z U. We strive to provide you with the best service and look forward to serving you again in the future.</p>
      <p style="color: #555;"><strong>T A Z Z U Team</strong></p>
    </div>`, // HTML body content
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res
      .status(200)
      .json({ status: "success", message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to send the email." });
  }
});

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
