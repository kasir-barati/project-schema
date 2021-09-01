import { JwtPayload } from './src/commons/types/jwt-payload.type';

declare global {
    namespace Express {
        export interface Request {
            payload?: JwtPayload;
            options?: any;
            userId: string;
        }
    }

    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
}
