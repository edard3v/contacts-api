import { UUID } from "node:crypto";
import { db } from "../../../db/db.ts";
import { contacts } from "../../../db/schema.ts";
import { EditContactDto } from "./edit_contact_dto.ts";
import { and, eq } from "drizzle-orm";
import { Record404 } from "../../../errors/Record404.ts";

export const edit_contact_service = async (
  account_id: UUID,
  contact_id: UUID,
  fields_to_update: EditContactDto
) => {
  const result = await db
    .update(contacts)
    .set({ ...fields_to_update })
    .where(and(eq(contacts.id, contact_id), eq(contacts.account_id, account_id)));

  if (!result.rowCount) throw new Record404();

  return result;
};
