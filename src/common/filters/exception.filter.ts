import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    LoggerService,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { Response } from '../../contracts/models/response.model';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: HttpException | any, host: ArgumentsHost) {
        console.log('here');

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<ExpressResponse>();
        if (exception instanceof HttpException) {
            const status = exception.getStatus();

            const e = exception.getResponse() as {
                message: string | string[];
            };
            this.logger.error(`with code: ${status} `, e);

            response
                .status(status)
                .json(new Response(false, null, null, e.message));
        } else if (exception.code == 11000) {
            response.status(400).send({
                message:
                    'duplication error on ' +
                    Object.keys(exception.keyValue),
            });
        } else {
            response
                .status(500)
                .send({ message: 'Internal server error' });
            this.logger.error(exception);
        }
    }
}
