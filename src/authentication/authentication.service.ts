import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, password: string) {
        const user = await this.userService.findOneUserByUsername(username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('username and password did not match');
        }
        const payload = { userId: user.id }
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
