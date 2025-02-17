import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Role } from "../enums/Role.ts";

export const accounts = sqliteTable("accounts", {
  id: text({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text({ enum: [Role.admin, Role.client, Role.seller] }).default(Role.client),
  email: text().unique().notNull(),
  password: text().notNull(),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertAccounts = typeof accounts.$inferInsert;
export type SelectAccounts = typeof accounts.$inferSelect;
