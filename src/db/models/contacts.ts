import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { accounts } from "./accounts.ts";

export const contacts = sqliteTable(
  "contacts",
  {
    id: text({ length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text().notNull(),
    tel: integer().notNull(),
    country: integer().notNull(), // recuerda validar con el enum Country

    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

    account_id: text()
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
  },

  (t) => [
    // Evita que una misma cuenta tenga name duplicados
    uniqueIndex("unique_name_per_account").on(t.account_id, t.name),

    // Evita que una misma cuenta tenga tel duplicados
    uniqueIndex("unique_tel_per_account").on(t.account_id, t.tel),
  ]
);

export type InsertContacts = typeof contacts.$inferInsert;
export type SelectContacts = typeof contacts.$inferSelect;
