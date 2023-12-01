import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ArticlesModule } from 'src/modules/articles/articles.module';
import { ApiResolver } from './api.resolver';

@Module({
    imports: [ArticlesModule],
    controllers: [ApiController],
    providers: [ApiResolver],
})
export class ApiModule { }

