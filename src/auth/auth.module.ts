import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { authConfigs } from '../configs/types/auth.type';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        // PassportModule.registerAsync({
        //     useFactory: () => ({
        //         defaultStrategy: 'jwt',
        //     }),
        // }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const {
                    adminSecret,
                } = configService.get<authConfigs>('authConfigs');
                return {
                    secret: adminSecret,
                    verifyOptions: {
                        ignoreExpiration: false,
                    },
                };
            },
        }),
    ],
    providers: [AuthService, ConfigService, JwtStrategy],
    // exports: [AuthService],
})
class AuthModule {}

export { AuthModule };
