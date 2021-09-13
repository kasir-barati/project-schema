import { LoggerService } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import * as morgan from 'morgan';

type MorganOptions = morgan.Options<IncomingMessage, ServerResponse>;

import { NodeEnv } from 'src/contracts/types/web.type';

export function morganMiddleware(
    logger: LoggerService,
    appMode: NodeEnv,
) {
    const morganOptions: MorganOptions = {
        stream: {
            write: function (message: string) {
                logger.log(message.trim());
            },
        },
    };
    if (appMode == NodeEnv.development) {
        return morgan('dev', morganOptions);
    } else {
        return morgan('tiny', morganOptions);
    }
}
