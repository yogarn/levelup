import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAllUsers(): Promise<Users[]> {
        return await this.prisma.user.findMany({
            include: {
                diary: true,
                role: true
            }
        });
    }

    async findOneUser(id: string): Promise<Users> {
        return await this.prisma.user.findFirst({
            where: {
                id
            },
            include: {
                diary: true,
                role: true
            }
        });
    }

    async findOneUserByUsername(username: string): Promise<Users> {
        return await this.prisma.user.findFirst({
            where: {
                username
            },
            include: {
                diary: true,
                role: true
            }
        });
    }

    async createUser(data: Prisma.userCreateInput): Promise<Users> {
        data.password = await bcrypt.hash(data.password, 10);
        return await this.prisma.user.create({
            data,
            include: {
                diary: true,
                role: true
            }
        });
    }

    async updateUser(id: string, data: Prisma.userUpdateInput): Promise<Users> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password.toString(), 10);
        }
        return await this.prisma.user.update({
            where: {
                id
            },
            data,
            include: {
                diary: true,
                role: true
            }
        })
    }

    async deleteUser(id: string): Promise<Users> {
        return await this.prisma.user.delete({
            where: {
                id
            },
            include: {
                diary: true,
                role: true
            }
        })
    }
}
