import { Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAllUsers(): Promise<string> {
        return await this.usersService.findAllUsers();
    }

    @Get('/:id')
    async findOneUser(@Param('id') id: string): Promise<string> {
        return await this.usersService.findOneUser(id);
    }

    @Post()
    async createUser(): Promise<string> {
        return await this.usersService.createUser();
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string): Promise<string> {
        return await this.usersService.updateUser(id);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<string> {
        return this.usersService.deleteUser(id)
    }
}
