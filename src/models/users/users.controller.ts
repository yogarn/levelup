import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthenticationGuard)
    @Get()
    async findAllUsers(): Promise<Users[]> {
        return await this.usersService.findAllUsers();
    }

    @UseGuards(AuthenticationGuard)
    @Get('/:id')
    async findOneUser(@Param('id') id: string): Promise<Users> {
        return await this.usersService.findOneUser(id);
    }

    // register new user
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

    @UseGuards(AuthenticationGuard)
    @Patch()
    async updateUser(@Req() req, @Body() data: UpdateUserDto): Promise<Users> {
        if (data.birthDate) {
            data.birthDate = new Date(data.birthDate);
        }
        return await this.usersService.updateUser(req.jwt.userId, {
            name: data.name,
            username: data.username,
            password: data.password,
            birthDate: data.birthDate
        });
    }

    @UseGuards(AuthenticationGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<Users> {
        return this.usersService.deleteUser(id)
    }
}
