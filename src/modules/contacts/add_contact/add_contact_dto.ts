import z from "zod";
import { name_zod } from "../../../utils/zod/name_zod.ts";
import { tel_zod } from "../../../utils/zod/tel_zod.ts";
import { country_zod } from "../../../utils/zod/country_zod.ts";

export const add_contact_dto = z
  .object({
    name: name_zod,
    tel: tel_zod,
    country: country_zod,
  })
  .strict();

export type AddContactDto = z.infer<typeof add_contact_dto>;
