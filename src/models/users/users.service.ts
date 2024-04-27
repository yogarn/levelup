import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
    async findAllUsers(): Promise<string> {
        return "hello world";
    }

    async findOneUser(id: string): Promise<string> {
        return "hello world";
    }

    async findOneUserByUsername(username: string): Promise<string> {
        return "hello world";
    }

    async createUser(): Promise<string> {
        return "hello world";
    }

    async updateUser(id: string): Promise<string> {
        return "hello world";
    }

    async deleteUser(id: string): Promise<string> {
        return "hello world";
    }
}
