import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { authConfigs } from '../../contracts/types/auth.type';
import { DecodedAdmin, DecodedUser } from '../types/decoded-jwt.type';

@Injectable()
// class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const { adminSecret } = configService.get<authConfigs>(
            'authConfigs',
        );

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
                'Token',
            ),
            secretOrKey: adminSecret,
            ignoreExpiration: false,
        });
    }

    validate(
        payload: DecodedAdmin | DecodedUser,
    ): DecodedAdmin | DecodedUser {
        return payload;
    }
}

export { JwtStrategy };
