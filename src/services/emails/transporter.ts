import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  auth: {
    user: Deno.env.get("NODEMAILER_GMAIL"),
    pass: Deno.env.get("NODEMAILER_GMAIL_APP_PASSWORD"),
  },
});
