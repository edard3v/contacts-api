import z from "zod";
import { name_zod } from "../../../utils/zod/name_zod.ts";
import { page_zod } from "../../../utils/zod/page_zod.ts";
import { limit_zod } from "../../../utils/zod/limit_zod.ts";

export const get_contacts_dto = z
  .object({
    name: name_zod,
    tel: z.coerce.number().int(),
    page: page_zod,
    limit: limit_zod,
  })
  .partial()
  .strict();

export type GetContactsDto = z.infer<typeof get_contacts_dto>;
