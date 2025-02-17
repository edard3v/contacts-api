import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: Deno.env.get("NODEMAILER_GMAIL"),
    pass: Deno.env.get("NODEMAILER_GMAIL_APP_PASSWORD"),
  },
});
