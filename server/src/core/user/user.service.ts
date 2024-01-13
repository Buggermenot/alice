import { Injectable } from "@nestjs/common";
import { AliceError } from "src/common/errors";

import { PrismaService } from "../../lib/prisma";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return {
        error: new AliceError(`Invalid User`, "user"),
      };
    }

    return {
      username: user.username,
    };
  }
}
