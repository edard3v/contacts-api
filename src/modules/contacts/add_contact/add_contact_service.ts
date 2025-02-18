import { UUID } from "node:crypto";
import { db } from "../../../db/db.ts";
import { contacts } from "../../../db/schema.ts";
import { AddContactDto } from "./add_contact_dto.ts";

export const add_contact_service = async (account_id: UUID, new_contact: AddContactDto) => {
  return await db.insert(contacts).values({ ...new_contact, account_id });
};
