import { Injectable } from "@nestjs/common";

import { AuthEntity, Prisma, User } from "@prisma/client";
import { Utils } from "src/common/Utils";
import { PrismaService } from "src/modules/database/prisma.service";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class AuthRepository {
    constructor(private prisma: PrismaService, private userService: UsersService) { }
    async create(params: { data: Prisma.AuthEntityCreateInput }): Promise<AuthEntity> {
        const { data } = params;
        return this.prisma.authEntity.create({ data });
    }

    async getByCredentials(params: Prisma.UserWhereInput): Promise<User | null> {
        const { username, password } = params;
        if (!username || !password) return null;
        const user = await this.userService.getUser({ username: username.toString() })
        if (!user?.password) return null;
        return Utils.equals(password.toString(), user.password).then((val) => {
            return user;
        }).catch((err) => {
            return null;
        })
    }
    async findOne(where: Prisma.AuthEntityWhereInput): Promise<AuthEntity | null> {
        return await this.prisma.authEntity.findFirst({ where });
    }
    async delete(data: Prisma.AuthEntityDeleteArgs): Promise<Boolean> {

        return this.prisma.authEntity.delete(data).then(() => {
            return true;
        }).catch((err) => {
            return false;
        })
    }
}
