import {
    Injectable,
    CanActivate,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from '../types/decoded-jwt.type';

@Injectable()
export class AdminRoleGuard implements CanActivate {
    /**
     * this guard depends on jwt guard. because it reads role from payload
     * use like this -> @UseGuards(JwtGuard, AdminRoleGuard)
     *
     * not this @UseGuards(AdminRoleGuard)
     * or this @UseGuards(AdminRoleGuard, JwtGuard)
     *
     */
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (!request.payload) {
            console.log('WARN: use AdminRoleGuard after JwtGuard!');
            throw new InternalServerErrorException();
        }
        const payload: JwtPayload = request.payload;
        // fetch user's roles
        if (payload) {
            return true;
        } else {
            return false;
        }
    }
}
