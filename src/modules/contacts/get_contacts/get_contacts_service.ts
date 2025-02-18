import { UUID } from "node:crypto";
import { db } from "../../../db/db.ts";
import { GetContactsDto } from "./get_contacts_dto.ts";
import { and, eq, like } from "drizzle-orm";
import { contacts } from "../../../db/schema.ts";
import { Record404 } from "../../../errors/Record404.ts";
import { PageErr } from "../../../errors/PageErr.ts";

export const get_contacts_service = async (account_id: UUID, filters: GetContactsDto) => {
  const { page = 1, limit = 20, name, tel } = filters;

  const where = [
    eq(contacts.account_id, account_id),
    name ? like(contacts.name, `%${name}%`) : undefined,
    tel ? eq(contacts.tel, tel) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(and(...where))
  ).length;

  if (!totalRecords) throw new Record404();

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new PageErr();

  const records = await db
    .select({
      id: contacts.id,
      name: contacts.name,
      tel: contacts.tel,
      country: contacts.country,
      created_at: contacts.created_at,
      updated_at: contacts.updated_at,
    })
    .from(contacts)
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    limit,
    page,
    totalPages,
    records,
  };
};
