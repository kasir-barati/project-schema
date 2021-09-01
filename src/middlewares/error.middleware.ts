import { serializeError } from 'serialize-error';
import { ValidationError } from 'class-validator';
import {
    Middleware,
    ExpressErrorMiddlewareInterface,
    HttpError,
} from 'routing-controllers';
import { UnauthorizedError } from 'express-jwt';
import { Request, Response as expressResponse } from 'express';

import { logger } from '../config/winston';
import { ErrorResponse, Response } from '../contracts/models/response.model';

class CustomValidationError {
    errors: ValidationError[];
}

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(
        error: HttpError | CustomValidationError | UnauthorizedError,
        request: Request,
        response: expressResponse,
    ): void {
        logger.error('http error occurred', {
            meta: serializeError(error),
        });
        if (error instanceof HttpError && !('errors' in error)) {
            response
                .status(error.httpCode)
                .json(new Response<null>(false, null, error.message));
        } else if (
            'errors' in error &&
            error.errors[0] instanceof CustomValidationError
        ) {
            const errorMessages: string[] = [];
            for (let temp of error.errors) {
                errorMessages.push(
                    ...(temp.constraints
                        ? Object.values(temp.constraints)
                        : ''),
                );
            }
            response.status(400).json(new ErrorResponse(false, errorMessages));
        } else if (error instanceof UnauthorizedError) {
            response
                .status(401)
                .json(new Response<null>(false, null, 'unauthorized'));
        } else {
            response
                .status(500)
                .json(new Response(false, {}, 'INTERNAL_SERVER_ERROR'));
        }
    }
}
