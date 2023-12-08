import { Field, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { AuthEntity as AuthEntityDB } from '@prisma/client';
import { IAuth } from './interfaces';
export class AuthEntity implements IAuth {
  @Field(() => Int)
  public id: AuthEntityDB["id"];
  @Field(() => String)
  public refreshToken: AuthEntityDB["refreshToken"];
  @Field(() => GraphQLISODateTime)
  public refreshTokenExpiresAt: AuthEntityDB["refreshTokenExpiresAt"];
  @Field(() => String)
  public accessToken: AuthEntityDB["accessToken"];
  @Field(() => GraphQLISODateTime)
  public accessTokenExpiresAt: AuthEntityDB["accessTokenExpiresAt"];
  @Field(() => Int)
  public userId: AuthEntityDB["userId"];
  @Field(() => GraphQLISODateTime)
  public createdAt: AuthEntityDB["createdAt"];
  @Field(() => GraphQLISODateTime)
  public updatedAt: AuthEntityDB["updatedAt"];

}
