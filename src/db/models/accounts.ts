import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { Role } from "../enums/Role.ts";

export const accounts = pgTable("accounts", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  role: text({ enum: [Role.admin, Role.client, Role.seller] }).default(Role.client),
  email: text().unique().notNull(),
  password: text().notNull(),

  created_at: timestamp().default(sql`now()`),
  updated_at: timestamp().$onUpdate(() => sql`now()`),
});

export type InsertAccounts = typeof accounts.$inferInsert;
export type SelectAccounts = typeof accounts.$inferSelect;
