import { NotFoundHandler } from "hono/types";

export const not_found_handler: NotFoundHandler = (context) => {
  context.status(404);
  context.header("Content-Type", "text/plain");
  return context.text("Ruta no encontrada");
};
