import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { signInDto } from './dto/sign-in.dto';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) { }

    @Post()
    async signIn(@Body() signInDto: signInDto): Promise<{ access_token: string }> {
        if (!signInDto.username || !signInDto.password) {
            throw new BadRequestException('Provide username and password');
        }
        return await this.authenticationService.signIn(signInDto.username, signInDto.password);
    }
}
