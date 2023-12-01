import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { Article, User } from '@prisma/client';

@Injectable()
export class ArticlesService {
    constructor(private repository: ArticlesRepository) { }

    async createArticle(params: {
        content: Article["content"];
        userId: User['id'],
        images: [String]
    }) {
        const { content, userId, images } = params;
        const buffer = Buffer.from(JSON.stringify(images));
        var bufferArray: Buffer[] = images.map(image => Buffer.from(image));

        const article = await this.repository.createArticle({
            data: {
                content,
                images: bufferArray,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }

        })
        return article;
    }
    async updateArticle(params: {
        newContent: Article["content"],
        userId: User['id'],
        images: Article['images'],
        articleId: Article['id']
    }) {
        const { newContent, userId, images, articleId } = params;
        const article = await this.repository.updateArticle({
            where: {
                id: articleId,
                userId: userId
            },
            data: {
                images,
                content: newContent
            }
        });
        return article;
    }
    async getArticles() {
        const articles = await this.repository.getArticles({});
        return articles;
    }
    async getArticlesById(articleId: Article["id"]) {
        const article = await this.repository.getArticles({
            where: {
                id: articleId,
            }
        })
        return article?.[0];
    }
    async getAllUserArticle(userId: User["id"]) {
        const articles = await this.repository.getArticles({
            where: {
                userId
            }
        })
        return articles;
    }
}