import { Module } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { PrismaModule } from '../database/prisma.module';
import { ArticlesService } from './articles.service';

@Module({
    imports: [PrismaModule],
    providers: [ArticlesRepository, ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule { }
