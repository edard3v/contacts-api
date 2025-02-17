import { transporter } from "../../../services/emails/transporter.ts";

export const send_mail_to_verify_register = async (to: string, link: string) => {
  return await transporter.sendMail({
    from: Deno.env.get("NODEMAILER_GMAIL"),
    to,
    subject: "Vericar email 📬 template 📬",
    html: `<a href=${link} style="color: royalblue">Clic aquí para verificar ✅ su registro.</a>`,
  });
};
