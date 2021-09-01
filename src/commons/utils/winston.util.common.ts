import { createLogger, format, transports, Logger } from 'winston';

export class CustomLogger {
    #logger: Logger;
    constructor(name: string) {
        this.#logger = createLogger({
            level: 'info',
            defaultMeta: { service: name },
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        format.prettyPrint({
                            depth: undefined,
                            colorize: true,
                        }),
                    ),
                }),
            ],
        });
    }

    debug(log: string, metadata?: { meta: any }) {
        this.#logger.debug(log, metadata);
    }
    info(log: string, metadata?: { meta: any }) {
        this.#logger.info(log, metadata);
    }
    warn(log: string, metadata?: { meta: any }) {
        this.#logger.warn(log, metadata);
    }
    error(log: string, metadata?: { meta: any }) {
        this.#logger.error(log, metadata);
    }
}

export const logger = new CustomLogger('microservice-or-app-name');
