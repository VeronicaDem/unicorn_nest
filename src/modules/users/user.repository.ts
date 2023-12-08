import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }
    async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
        const { data } = params;
        return this.prisma.user.create({ data });
    }

    async getUser(params: {
        where?: Prisma.UserWhereInput;
    }): Promise<User | null> {
        const { where } = params;
        return this.prisma.user.findFirst({ where });
    }

}