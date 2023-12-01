import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Article } from 'src/modules/articles/article.model';
import { ArticlesService } from 'src/modules/articles/articles.service';

@Resolver()
export class ApiResolver {
    constructor(private readonly articlesService: ArticlesService) { }

    @Query(() => [Article])
    async getTweets() {
        return this.articlesService.getArticles();
    }
    @Mutation(() => Article)
    async createArticle(
        @Args({ name: `content`, type: () => String }) content: string,
        @Args({ name: `userId`, type: () => Int }) userId: number,
        @Args({ name: `images`, type: () => [String] }) images: [String]
    ) {
        return this.articlesService.createArticle({ content, userId, images });
    }
}

