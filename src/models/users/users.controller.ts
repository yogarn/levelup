import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { Roles } from 'src/models/roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  @Get()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(['admin'])
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
      throw new BadRequestException(
        'provide name, username, password, and birthDate',
      );
    }

    await this.cacheManager.del(`/users`);

    return await this.usersService.createUser({
      name: data.name,
      username: data.username,
      password: data.password,
      birthDate: new Date(data.birthDate),
    });
  }

  @UseGuards(AuthenticationGuard)
  @Patch()
  async updateUser(@Req() req, @Body() data: UpdateUserDto): Promise<Users> {
    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }

    await this.cacheManager.del(`/users/${req.jwt.userId}`);

    return await this.usersService.updateUser(req.jwt.userId, {
      name: data.name,
      username: data.username,
      password: data.password,
      birthDate: data.birthDate,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<Users> {
    await this.cacheManager.del('/users');
    await this.cacheManager.del(`/users/${id}`);
    return this.usersService.deleteUser(id);
  }
}
