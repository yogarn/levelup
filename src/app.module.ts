import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DiariesModule } from './models/diaries/diaries.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthenticationModule, DiariesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
