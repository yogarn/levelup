import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from 'src/common/interfaces/response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
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
