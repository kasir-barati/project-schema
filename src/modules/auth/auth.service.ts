import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { authConfigs } from '../../contracts/types/auth.type';
import { JwtPayload } from './types/decoded-jwt.type';

type User = any;

@Injectable()
class AuthService {
    // constructor(
    //     private readonly jwtService: JwtService,
    //     private readonly configService: ConfigService,
    // ) {}
    // async verifyAdmin(
    //     token: string,
    // ): Promise<{ decodedAdmin: DecodedAdmin }> {
    //     const {
    //         adminSecret,
    //     } = await this.configService.get<authConfigs>('authConfigs');
    //     const decodedAdmin = this.jwtService.verify<DecodedAdmin>(
    //         token,
    //         {
    //             secret: adminSecret,
    //         },
    //     );
    //     return { decodedAdmin };
    // }
    // async verifyContractor(
    //     token: string,
    // ): Promise<{ decodedUser: JwtPayload }> {
    //     const {
    //         userSecret,
    //     } = await this.configService.get<authConfigs>('authConfigs');
    //     const decodedUser = this.jwtService.verify<JwtPayload>(
    //         token,
    //         {
    //             secret: userSecret,
    //         },
    //     );
    //     return { decodedUser };
    // }
}

export { AuthService };
