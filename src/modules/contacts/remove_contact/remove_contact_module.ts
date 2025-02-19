import { Hono } from "hono";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { TokenPayload } from "../../auth/login/login_service.ts";
import { UUID } from "node:crypto";
import { remove_contact_service } from "./remove_contact_service.ts";

export const remove_contact_module = new Hono();

remove_contact_module.delete(
  "/:id",

  verify_auth,

  // Controller
  async (context) => {
    const { id: account_id } = context.get("tokenPayload") as TokenPayload;
    const contact_id = context.req.param("id");
    await remove_contact_service(account_id, contact_id as UUID);
    return context.json({ msg: "Contacto eliminado correctamente." });
  }
);
