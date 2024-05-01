import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/models/roles/roles.decorator';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findOneUser(request.jwt.userId);
    if (!user || !user.role || !user.role.name) {
      return false;
    }
    return roles.includes(user.role.name);
  }
}