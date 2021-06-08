import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
    MongooseModule,
    MongooseModuleOptions,
} from '@nestjs/mongoose';

import { authConfigsGenerator } from './configs/auth.config';
import { webAppConfigsGenerator } from './configs/web-app.config';
import { mongodbConfigsGenerator } from './configs/mongodb.config';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.mongo'],
            load: [
                authConfigsGenerator,
                mongodbConfigsGenerator,
                webAppConfigsGenerator,
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
