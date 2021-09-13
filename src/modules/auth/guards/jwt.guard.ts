import { ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // constructor(private reflector: Reflector) {
    //     super();
    // }

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
        // return true;
    }

    handleRequest(err, user, info) {
        // if (err || !user) {
        //     throw err || new UnauthorizedException();
        // }
        return user;
    }
}
