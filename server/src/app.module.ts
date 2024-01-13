import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";

import { AtGuard } from "./common/guards";
import { CoreModule } from "./core/core.module";
import { PrismaModule } from "./lib/prisma";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, PrismaModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
