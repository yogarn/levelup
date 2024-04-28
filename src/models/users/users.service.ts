import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async findAllUsers(): Promise<Users[]> {
        return await this.prisma.user.findMany();
    }

    async findOneUser(id: string): Promise<Users> {
        return await this.prisma.user.findFirst({
            where: {
                id
            }
        });
    }

    async findOneUserByUsername(username: string): Promise<Users> {
        return await this.prisma.user.findFirst({
            where: {
                username
            }
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<Users> {
        data.password = await bcrypt.hash(data.password, 10);
        return await this.prisma.user.create({
            data
        });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<Users> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password.toString(), 10);
        }
        return await this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async deleteUser(id: string): Promise<Users> {
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
