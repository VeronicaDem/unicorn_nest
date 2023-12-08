import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { AuthType } from "./types";

import { Public } from "../common/decorators";
import { AuthService } from "./auth.service";
import { UsersService } from "src/modules/users/users.service";
import { IAuth } from "./interfaces";
import { AuthEntity } from "@prisma/client";



@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {
  }

  @Public()
  @Mutation(_returns => AuthType)
  async login(@Args("username") username: string, @Args("password") password: string): Promise<IAuth> {
    return this.authService.login({ username, password });
  }

  @Public()
  @Mutation(_returns => AuthType)
  async refreshToken(@Args("refreshToken") refreshToken: string): Promise<IAuth> {
    return this.authService.refresh({ refreshToken });
  }

  @Mutation(_returns => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    const authEntity = await this.authService.getAuthEntity({ refreshToken });
    if (authEntity) {
      await this.authService.delete({ where: { id: authEntity.id } });
    }
    return true;
  }

  @Public()
  @Mutation(_returns => AuthType)
  async signup(
    @Args("username") username: string,
    @Args("password") password: string,
  ): Promise<IAuth> {
    const user = await this.userService.createUser({ username, password });
    return this.authService.loginUser(user);
  }
}
