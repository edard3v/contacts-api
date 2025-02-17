import { NotFoundHandler } from "hono/types";

export const not_found_handler: NotFoundHandler = (context) => {
  context.status(404);
  return context.json({ msg: "Ruta no encontrada" });
};
