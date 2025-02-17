import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../db.ts";

export async function runMigrations() {
  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  });
}

if (import.meta.main) {
  await runMigrations();
}
