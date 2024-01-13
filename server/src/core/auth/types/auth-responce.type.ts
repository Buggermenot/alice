import { User } from "@prisma/client";

import { Tokens } from "./tokens.type";

export type AuthResponce = {
  username: User["username"];
} & Tokens;
