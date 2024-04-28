import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { IResponse } from 'src/common/interfaces/response';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    var statusCode: number;

    switch (exception.code) {
      case 'P2002': {
        statusCode = HttpStatus.CONFLICT;
        break;
      }
      case 'P2018': {
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      case 'P2025': {
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    const errorResponse: IResponse<null> = {
      status: false,
      statusCode,
      message,
      data: null,
    };

    response.status(statusCode).json(errorResponse);
  }
}