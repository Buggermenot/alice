import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { RegisterDto } from "src/core/auth/dto";

import { CurrentUser, Public } from "../../common/decorators";
import { RtGuard } from "../../common/guards";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Tokens } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDto: RegisterDto): Promise<Tokens> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: AuthDto): Promise<Tokens> {
    return this.authService.login(loginDto);
  }

  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser("sub") userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("/refresh-token")
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @CurrentUser("sub") userId: string,
    @CurrentUser("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
