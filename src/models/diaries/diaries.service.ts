import { Injectable } from '@nestjs/common';
import { Diaries } from './diaries.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DiariesService {
    constructor(private prismaService: PrismaService) { }

    async findAllDiaries(): Promise<Diaries[]> {
        return await this.prismaService.diary.findMany();
    }

    async findDiaryByid(id: string): Promise<Diaries> {
        return await this.prismaService.diary.findFirst({
            where: {
                id
            }
        });
    }

    async createDiary(userId: string, data: Prisma.diaryCreateInput): Promise<Diaries> {
        return await this.prismaService.diary.create({
            data
        });
    }

    async updateDiary(id: string, data: Prisma.diaryUpdateInput): Promise<Diaries> {
        return await this.prismaService.diary.update({
            where: {
                id
            },
            data
        })
    }

    async deleteDiary(id: string): Promise<Diaries> {
        return await this.prismaService.diary.delete({
            where: {
                id
            }
        })
    }
}
