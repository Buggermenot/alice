import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log("Prisma connection error", error, PrismaService.name);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    const exitHandler = async () => {
      console.log("Prisma connection error", PrismaService.name);
      await app.close();
    };

    process.on("exit", exitHandler);
    process.on("beforeExit", exitHandler);
    process.on("SIGINT", exitHandler);
    process.on("SIGTERM", exitHandler);
    process.on("SIGUSR2", exitHandler);
  }
}
