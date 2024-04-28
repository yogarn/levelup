import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/global-exception/global-exception.filter';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaClientExceptionFilter())

  await app.listen(3000);
}
bootstrap();
