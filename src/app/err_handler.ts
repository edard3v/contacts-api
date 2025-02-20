import { ErrorHandler } from "hono/types";
import { HTTPException } from "hono/http-exception";

export const err_handler: ErrorHandler = (err, context) => {
  if (err instanceof HTTPException) {
    return context.json({ error: err.message, status: err.status });
  }

  console.log(err);
  context.status(500);
  return context.json({ err_name: err.name, msg: "Error de servidor" });
};
