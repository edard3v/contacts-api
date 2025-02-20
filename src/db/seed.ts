import { db } from "./db.ts";
import { ACCOUNTS } from "./drafts/accounts.draft.ts";
import { CONTACTS } from "./drafts/contacts.draft.ts";
import { accounts, contacts } from "./schema.ts";

const seed = async () => {
  await db.delete(accounts).execute();

  await db.insert(accounts).values(ACCOUNTS);
  await db.insert(contacts).values(CONTACTS);
};

seed().catch(console.error);
