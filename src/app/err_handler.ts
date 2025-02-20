import { ErrorHandler } from "hono/types";
import { HTTPException } from "hono/http-exception";

export const err_handler: ErrorHandler = (err, context) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.log(err);
  context.status(500);
  context.header("Content-Type", "text/plain");
  return context.text(err.name);
};
