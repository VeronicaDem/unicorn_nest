import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../database/prisma.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule { }
