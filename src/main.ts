import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

import { csrf as csrfErrorHandler } from './common/middlewares/errors/csrf.middleware';
import { corsConfigsGenerator } from './configs/cors.config';
import { csrf } from './common/middlewares/general/csrf.middleware';
import { NodeEnv, webAppConfigs } from './contracts/types/web.type';
import { AppModule } from './app.module';
import { morganMiddleware } from './common/middlewares/general/morgan.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { corsConfigs } = corsConfigsGenerator();
    const configService = app.get(ConfigService);
    const nestWinston: LoggerService = app.get(
        WINSTON_MODULE_NEST_PROVIDER,
    );
    const appConfigs = configService.get<webAppConfigs>(
        'webAppConfigs',
    );

    /**
     * Config morgan to use winston as a logger
     */
    app.useLogger(nestWinston);
    app.use(morganMiddleware(nestWinston, appConfigs.nodeEnv));
    /**
     * Secure the RESTful API
     */
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

    /**
     * Config Swagger
     */
    if (appConfigs.nodeEnv === NodeEnv.development) {
        const options = new DocumentBuilder()
            .setTitle('document-title')
            .setDescription('A short description.')
            .setVersion('1.0')
            .addBearerAuth({
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
            })
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(
            configService.get('SWAGGER_ROUTE'),
            app,
            document,
        );
    }

    // TODO: log the app connection info via winston
    await app.listen(appConfigs.port);
    if (appConfigs.nodeEnv === NodeEnv.development) {
        console.log(
            `see docs on swagger: http://${appConfigs.host}:${appConfigs.port}/${appConfigs.swaggerRoute}`,
        );
    }
}
bootstrap();
