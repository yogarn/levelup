import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/global-exception/global-exception.filter';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { ResponseInterceptor } from './common/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaClientExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(3000);
}
bootstrap();
