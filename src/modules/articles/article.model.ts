import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Article as ArticleDB } from '@prisma/client';

@ObjectType()
export class Article {
    @Field(() => Int)
    id: ArticleDB[`id`];

    @Field(() => GraphQLISODateTime)
    updatedAt: ArticleDB[`updatedAt`];
    @Field(() => GraphQLISODateTime)
    createdAt: ArticleDB[`createdAt`];

    @Field(() => String)
    content: ArticleDB[`content`];

    @Field(() => [String])
    images: ArticleDB[`images`];

    @Field(() => Int)
    userId: ArticleDB[`userId`];


}