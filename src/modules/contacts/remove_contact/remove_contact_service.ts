import { UUID } from "node:crypto";
import { db } from "../../../db/db.ts";
import { contacts } from "../../../db/schema.ts";
import { and, eq } from "drizzle-orm";
import { Record404 } from "../../../errors/Record404.ts";

export const remove_contact_service = async (account_id: UUID, contact_id: UUID) => {
  const result = await db
    .delete(contacts)
    .where(and(eq(contacts.account_id, account_id), eq(contacts.id, contact_id)));

  if (!result.rowCount) throw new Record404();

  return result;
};
