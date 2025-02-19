import { Resend } from "resend";

export const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
