import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { Utils } from 'src/common/Utils';

@Injectable()
export class UsersService {
    constructor(private repository: UserRepository) { }

    async createUser(params: {
        username: User["username"],
        password: User["password"]
    }) {
        const { username, password } = params;
        const encryptedPassword = await Utils.encryptPassword(password);
        const user = await this.repository.createUser({
            data: {
                username,
                password: encryptedPassword
            }

        })
        return user;
    }
    async getUser(params: {
        username: User["username"]
    }) {
        const { username } = params;

        const user = await this.repository.getUser({
            where: {
                username
            }
        })
        return user;
    }
    async getUserById(params: {
        id: User["id"]
    }) {
        const { id } = params;
        const user = await this.repository.getUser({
            where: {
                id
            }
        })
        return user;
    }
}