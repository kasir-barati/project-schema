import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

import { AppModule } from './app.module';
import { csrf as csrfErrorHandler } from './middlewares/errors/csrf.middleware';
import { csrf } from './middlewares/general/csrf.middleware';
import { corsConfigsGenerator } from './configs/cors.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { corsConfigs } = corsConfigsGenerator();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            errorHttpStatusCode: 422,
        }),
    );
    app.enableCors(corsConfigs);
    app.use(cookieParser());
    app.use(helmet());
    app.use(
        csurf({
            cookie: { sameSite: true },
            value: (req) => req.cookies['XSRF-TOKEN'],
        }),
    );
    app.use(csrf);
    // app.use(csurf({ cookie: true })); FIXME: does not work, but i still do not know why
    app.use(csrfErrorHandler);
    await app.listen(3000);
}
bootstrap();
