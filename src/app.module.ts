import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
