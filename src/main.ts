import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

import { csrf as csrfErrorHandler } from './middlewares/errors/csrf.middleware';
import { corsConfigsGenerator } from './configs/cors.config';
import { csrf } from './middlewares/general/csrf.middleware';
import { webAppConfigs } from './configs/types/web.type';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { corsConfigs } = corsConfigsGenerator();
    const configService = app.get(ConfigService);
    const appConfigs = configService.get<webAppConfigs>(
        'webAppConfigs',
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
    // TODO: log the app connection info via winston
    await app.listen(appConfigs.port);
}
bootstrap();
