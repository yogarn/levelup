import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { Diaries } from './diaries.entity';
import { createDiaryDto } from './dto/create-diary.dto';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { updateDiaryDto } from './dto/update-diary.dto';

@UseGuards(AuthenticationGuard)
@Controller('diaries')
export class DiariesController {
    constructor(private diariesService: DiariesService) { }

    @Get()
    async findAllDiaries(): Promise<Diaries[]> {
        return await this.diariesService.findAllDiaries();
    }

    @Get('/:id')
    async findDiaryById(@Param('id') id: string): Promise<Diaries> {
        return await this.diariesService.findDiaryByid(id);
    }

    @Post()
    @UseGuards(AuthenticationGuard)
    async createDiary(@Req() req, @Body() diary: createDiaryDto): Promise<Diaries> {
        if (!diary.title || !diary.body) {
            throw new BadRequestException('provide title and body');
        }
        return await this.diariesService.createDiary(req.jwt.userId, {
            title: diary.title,
            body: diary.body,
            user: { connect: { id: req.jwt.userId } },
        })
    }

    @Patch('/:id')
    async updateDiary(@Param('id') id: string, @Body() diary: updateDiaryDto): Promise<Diaries> {
        return await this.diariesService.updateDiary(id, diary);
    }

    @Delete('/:id')
    async deleteDiary(@Param('id') id: string): Promise<Diaries> {
        return await this.diariesService.deleteDiary(id);
    }
}
