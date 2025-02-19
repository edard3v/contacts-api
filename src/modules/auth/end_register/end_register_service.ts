import { db } from "../../../db/db.ts";
import { accounts } from "../../../db/schema.ts";
import { StartRegisterDto } from "../start_register/start_register_dto.ts";

export const end_register_service = async (newAccount: StartRegisterDto) => {
  console.log("***********Registering*********");
  await db.insert(accounts).values({ ...newAccount });
};
