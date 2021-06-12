import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

function winstonConfigsGenerator():
    | {
          loggerOptions: winston.LoggerOptions;
      }
    | never {
    const loggerOptions: winston.LoggerOptions = {
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike(),
                ),
            }),
        ],
    };
    return {
        loggerOptions,
    };
}

export { winstonConfigsGenerator };
