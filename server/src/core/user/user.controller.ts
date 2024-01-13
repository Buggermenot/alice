import { Controller, HttpStatus, Get, HttpCode } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get("/me")
  async getCurrentUser(@CurrentUser("sub") userId: string) {
    return this.userService.getCurrentUser(userId);
  }
}
