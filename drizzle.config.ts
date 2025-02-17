import { defineConfig } from "drizzle-kit";
import { IS_PRODUCTION } from "./src/app/config.ts";

export const DB_CREDENTIAL = {
  url: !IS_PRODUCTION ? "file:./src/db/contacts.db" : Deno.env.get("TURSO_DATABASE_URL")!,
  authToken: Deno.env.get("TURSO_AUTH_TOKEN")!,
};

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "turso",
  dbCredentials: DB_CREDENTIAL,
  introspect: { casing: "preserve" },
});
