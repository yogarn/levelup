import { BadRequestException, Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { signInDto } from './dto/sign-in.dto';
import { Users } from 'src/models/users/users.interface';
import { AuthenticationGuard } from './authentication.guard';
import { UsersService } from 'src/models/users/users.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UsersService
    ) { }

    @Post()
    async signIn(@Body() signInDto: signInDto): Promise<{ access_token: string }> {
        if (!signInDto.username || !signInDto.password) {
            throw new BadRequestException('Provide username and password');
        }
        return await this.authenticationService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthenticationGuard)
    @Get()
    async loginInfo(@Request() req): Promise<Users> {
        if (!req.jwt.userId) {
            throw new UnauthorizedException();
        }
        return await this.userService.findOneUser(req.jwt.userId);
    }
}
