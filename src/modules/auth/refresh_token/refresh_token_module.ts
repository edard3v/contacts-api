import { Hono } from "hono";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { refresh_token_service } from "./refresh_token_service.ts";

export const refresh_token_module = new Hono();

refresh_token_module.post(
  "",

  verify_auth,

  // Controller
  (context) => {
    const tokenPayload = context.get("tokenPayload");
    const newToken = refresh_token_service(tokenPayload);
    return context.json({ token: newToken });
  }
);
