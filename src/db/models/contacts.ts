import { sql } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { accounts } from "./accounts.ts";

export const contacts = pgTable(
  "contacts",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: text().notNull(),
    tel: bigint({ mode: "number" }).notNull(),
    country: text().notNull(), // recuerda validar con el enum Country

    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

    account_id: uuid()
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
