import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from "argon2";
import { RegisterDto } from "src/core/auth/dto";

import { PrismaService } from "../../lib/prisma";

import { AuthDto } from "./dto/auth.dto";
import { JwtPayload, AuthResponce, Tokens } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponce> {
    const hashedPassword = await argon.hash(registerDto.password);

    const newUser = await this.prisma.user
      .create({
        data: {
          email: registerDto.email,
          username: registerDto.username,
          password: hashedPassword,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(newUser.id);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

    return { ...tokens, username: newUser.username };
  }

  async login(loginDto: AuthDto): Promise<AuthResponce> {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) throw new ForbiddenException("Access Denied!");

    const passwordMatches = await argon.verify(
      user.password,
      loginDto.password,
    );
    if (!passwordMatches) throw new ForbiddenException("Access Denied!");

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return { ...tokens, username: user.username };
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async refreshToken(userId: string, rt: string) {
    console.log({ userId, rt });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied!");

    const doesRtMatches = argon.verify(user.refreshToken, rt);
    if (!doesRtMatches) throw new ForbiddenException("Access Denied!");

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshTokenHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async getTokens(userId: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: "1d",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "30d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
