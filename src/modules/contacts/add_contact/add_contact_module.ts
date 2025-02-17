import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { add_contact_dto } from "./add_contact_dto.ts";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { add_contact_service } from "./add_contact_service.ts";
import { TokenPayload } from "../../auth/login/login_service.ts";

export const add_contact_module = new Hono();

add_contact_module.post(
  "",

  verify_auth,

  zValidator("json", add_contact_dto),

  // Controller
  async (context) => {
    const { id } = context.get("tokenPayload") as TokenPayload;
    const new_contact = context.req.valid("json");
    await add_contact_service(id, new_contact);
    return context.json({ msg: "Contacto agregado correctamente." });
  }
);
