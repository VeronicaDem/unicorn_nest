import { Module } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { PrismaModule } from '../database/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [ArticlesRepository],
})
export class ArticlesModule { }
