import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


import { v4 } from "uuid";


import { IAuth, ILoginFields } from "./interfaces";
import { AuthEntity } from "./auth.entity";
import { accessTokenExpiresIn, refreshTokenExpiresIn } from "./auth.constants";
import { UsersService } from "src/modules/users/users.service";
import { AuthRepository } from "./auth.repository";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(data: ILoginFields): Promise<IAuth> {
    const user = await this.authRepository.getByCredentials({ username: data.username, password: data.password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.loginUser(user);
  }

  public async getAuthEntity(where: Prisma.AuthEntityWhereInput): Promise<AuthEntity | null> {
    return await this.authRepository.findOne(where);
  }
  public async refresh(where: Prisma.AuthEntityWhereInput): Promise<IAuth> {
    const authEntity = await this.authRepository.findOne(where);

    if (!authEntity || authEntity.refreshTokenExpiresAt.getTime() > new Date().getTime()) {
      throw new UnauthorizedException();
    }
    const user: any = this.userService.getUserById({
      id: authEntity.userId
    })
    return this.loginUser(user);
  }
  public async delete(data: Prisma.AuthEntityDeleteArgs): Promise<Boolean> {
    return await this.authRepository.delete(data);
  }
  public async loginUser(user: any): Promise<IAuth> {
    const refreshToken = v4();
    const date = new Date();

    const auth = await this.authRepository
      .create({
        data: {
          user,
          refreshToken,
          accessTokenExpiresAt: new Date(date.getTime() + accessTokenExpiresIn),
          refreshTokenExpiresAt: new Date(date.getTime() + refreshTokenExpiresIn)
        }
      });

    return {
      accessToken: this.jwtService.sign({ username: user.username }, { expiresIn: accessTokenExpiresIn / 1000 }),
      refreshToken: refreshToken,
      accessTokenExpiresAt: new Date(date.getTime() + accessTokenExpiresIn),
      refreshTokenExpiresAt: new Date(date.getTime() + refreshTokenExpiresIn),
    };
  }
}
