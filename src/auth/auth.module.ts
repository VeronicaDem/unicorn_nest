import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

import { AuthResolver } from "./auth.resolver";
import { AuthEntity } from "./auth.entity";
import { UsersModule } from "src/modules/users/users.module";


@Module({
  imports: [
    AuthEntity,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule { }
