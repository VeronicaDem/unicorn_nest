
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from 'src/modules/articles/articles.service';


@Controller('api')
export class ApiController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post(`article`)
    async createArticle(@Body() data: { content: string; userId: string, images: any }) {
        const { content, userId, images } = data;
        return this.articlesService.createArticle({
            images,
            content,
            userId: Number(userId),

        });
    }

    @Get('articles')
    getArticles() {
        return this.articlesService.getArticles();
    }
}