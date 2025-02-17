import { relations } from "drizzle-orm/relations";
import { accounts, contacts } from "./migrations/schema.ts";

export const contactsRelations = relations(contacts, ({ one }) => ({
  account: one(accounts, {
    fields: [contacts.account_id],
    references: [accounts.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ many }) => ({
  contacts: many(contacts),
}));
