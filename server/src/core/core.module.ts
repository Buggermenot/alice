import { Module } from "@nestjs/common";

import { PrismaModule } from "../lib/prisma";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
