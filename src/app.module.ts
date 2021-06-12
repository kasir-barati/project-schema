import {
    WinstonModule,
    utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
    MongooseModule,
    MongooseModuleOptions,
} from '@nestjs/mongoose';

import { mongodbConfigsGenerator } from './configs/mongodb.config';
import { winstonConfigsGenerator } from './configs/winston.config';
import { webAppConfigsGenerator } from './configs/web-app.config';
import { authConfigsGenerator } from './configs/auth.config';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        WinstonModule.forRootAsync({
            useFactory: async (
                configService: ConfigService,
            ): Promise<winston.LoggerOptions> => ({
                ...configService.get<winston.LoggerOptions>(
                    'loggerOptions',
                ),
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.mongo'],
            load: [
                authConfigsGenerator,
                mongodbConfigsGenerator,
                webAppConfigsGenerator,
                winstonConfigsGenerator,
            ],
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                ...configService.get<MongooseModuleOptions>(
                    'mongodbConfigs',
                ),
            }),
            inject: [ConfigService],
        }),
        TestModule,
        AuthModule,
    ],
})
export class AppModule {}
