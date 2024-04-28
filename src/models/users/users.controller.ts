import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAllUsers(): Promise<Users[]> {
        return await this.usersService.findAllUsers();
    }

    @Get('/:id')
    async findOneUser(@Param('id') id: string): Promise<Users> {
        return await this.usersService.findOneUser(id);
    }

    @Post()
    async createUser(@Body() data: CreateUserDto): Promise<Users> {
        if (!data.name || !data.username || !data.password || !data.birthDate) {
            throw new BadRequestException('provide name, username, password, and birthDate')
        }
        return await this.usersService.createUser({
            name: data.name,
            username: data.username,
            password: data.password,
            birthDate: new Date(data.birthDate)
        });
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<Users> {
        if (data.birthDate) {
            data.birthDate = new Date(data.birthDate);
        }
        return await this.usersService.updateUser(id, {
            name: data.name,
            username: data.username,
            password: data.password,
            birthDate: data.birthDate
        });
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<Users> {
        return this.usersService.deleteUser(id)
    }
}
