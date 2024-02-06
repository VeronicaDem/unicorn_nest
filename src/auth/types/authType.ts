import {Field, ObjectType} from "@nestjs/graphql";
import {IAuth} from "../interfaces";

@ObjectType()
export class AuthType implements IAuth {
  @Field()
  public accessToken: string;

  @Field()
  public refreshToken?: string;

  @Field()
  public accessTokenExpiresAt: Date;

  @Field()
  public refreshTokenExpiresAt?: Date;
}
