import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class ArticlesRepository {
    constructor(private prisma: PrismaService) { }
    async createArticle(params: { data: Prisma.ArticleCreateInput }): Promise<Article> {
        const { data } = params;
        return this.prisma.article.create({ data });
    }

    async getArticles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ArticleWhereUniqueInput;
        where?: Prisma.ArticleWhereInput;
        orderBy?: Prisma.ArticleOrderByWithRelationInput;
    }): Promise<Article[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.article.findMany({ skip, take, cursor, where, orderBy });
    }

    async updateArticle(params: {
        where: Prisma.ArticleWhereUniqueInput;
        data: Prisma.ArticleUpdateInput;
    }): Promise<Article> {
        const { where, data } = params;
        return this.prisma.article.update({ where, data });
    }

    async deleteArticle(params: {
        where: Prisma.ArticleWhereUniqueInput;
    }): Promise<Article> {
        const { where } = params;
        return this.prisma.article.delete({ where });
    }
}