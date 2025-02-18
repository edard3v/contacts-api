import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { TokenPayload } from "../../auth/login/login_service.ts";
import { get_contacts_dto } from "./get_contacts_dto.ts";
import { get_contacts_service } from "./get_contacts_service.ts";

export const get_contacts_module = new Hono();

get_contacts_module.get(
  "",

  verify_auth,

  zValidator("query", get_contacts_dto),

  // Controller
  async (context) => {
    const { id } = context.get("tokenPayload") as TokenPayload;
    const filters = context.req.valid("query");
    const contacts = await get_contacts_service(id, filters);
    return context.json(contacts);
  }
);
