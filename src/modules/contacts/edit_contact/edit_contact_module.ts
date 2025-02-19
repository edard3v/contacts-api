import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { TokenPayload } from "../../auth/login/login_service.ts";
import { edit_contact_dto } from "./edit_contact_dto.ts";
import { edit_contact_service } from "./edit_contact_service.ts";
import { UUID } from "node:crypto";

export const edit_contact_module = new Hono();

edit_contact_module.put(
  "/:id",

  verify_auth,

  zValidator("json", edit_contact_dto),

  // Controller
  async (context) => {
    const { id } = context.get("tokenPayload") as TokenPayload;
    const contact_id = context.req.param("id");
    const fields_to_update = context.req.valid("json");
    await edit_contact_service(id, contact_id as UUID, fields_to_update);
    return context.json({ msg: "Contacto editado correctamente." });
  }
);
