import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, code } = await req.json(); // Get email and code from request

    // Create a transporter
    const transport = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey", // This is the literal string 'apikey'
        pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
      },
    });

    const mailOptions = {
      from: '"Harsh" <giri64563@gmail.com>', // Verified sender
      replyTo: "giri64563@gmail.com", // Verified reply-to
      to: email,
      subject: "SynapseCode | Verification Code",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verification Code</title>
          </head>
          <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Hello, Coder!</h2>
              <p>Your verification code for SynapseCode is:</p>
              <h3 style="color: green;">${code}</h3>
              <p>Please enter this code on the website to verify your email.</p>
              <p>Thank you!</p>
              <p style="font-size: 12px; color: gray;">
                SynapseCode | N-20/A, Amar Market, Sourabh Vihar, Jaitpur, Badarpur, New Delhi, 110044 IND | <a href="mailto:giri64563@gmail.com">Contact Support</a>
              </p>
              <p style="font-size: 12px; color: gray;">If you didn’t request this, please ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    };

    const result = await transport.sendMail(mailOptions);

    if (result.rejected.length > 0) {
      return NextResponse.json({ success: false, message: "Verification email not sent!" });
    }

    console.log("Email sent successfully");
    return NextResponse.json({ success: true, message: "Verification email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
