import { Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles/articles.module';
import { PrismaModule } from './modules/database/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiModule } from './api/api.module';
@Module({
  imports: [
    ArticlesModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
