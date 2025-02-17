import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.ts";
import { DB_CREDENTIAL } from "../../drizzle.config.ts";
import { createClient } from "@libsql/client/node";
import * as relations from "./relations.ts";

const client = createClient(DB_CREDENTIAL);

export const db = drizzle({
  client,
  schema: { ...schema, ...relations },
});
