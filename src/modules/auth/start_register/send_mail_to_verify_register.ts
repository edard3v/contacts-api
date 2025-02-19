import { resend } from "../../../services/emails/resend.ts";

export const send_mail_to_verify_register = async (to: string, link: string) => {
  return await resend.emails.send({
    from: "on-behalf-of@resend.dev",
    to,
    subject: "Vericar email 📬 contacts 📬",
    html: `<a href=${link} style="color: royalblue">Clic aquí para verificar ✅ su registro.</a>`,
  });
};
