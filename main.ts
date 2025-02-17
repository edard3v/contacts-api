import { app } from "./src/app/app.ts";
import { PORT } from "./src/app/config.ts";

Deno.serve(
  {
    port: PORT,
    onListen() {
      console.log(`Servidor escuchando en http://localhost:${PORT}/`);
    },
  },
  app.fetch
);
