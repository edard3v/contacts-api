import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { accounts } from "./accounts.ts";

export const contacts = sqliteTable("contacts", {
  id: text({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  tel: integer(),
  country: integer(), // recuerda validar con el enum Country

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  account_id: text()
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
});

export type InsertContacts = typeof contacts.$inferInsert;
export type SelectContacts = typeof contacts.$inferSelect;
