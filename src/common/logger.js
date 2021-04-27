// @ts-check
require('winston-mongodb');
const winston = require('winston');

class Logger {
    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this._logger = winston.createLogger({
            level: 'debug',
            defaultMeta: { service: name },
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.prettyPrint({
                            depth: 4,
                            colorize: true,
                        }),
                    ),
                }),
                new winston.transports.MongoDB({
                    level: 'info',
                    db: process.env.MONGODB_CONNECTION_STRING,
                    options: {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                    collection: 'winstonLogs',
                    metaKey: 'meta',
                    label: name,
                }),
            ],
            meta: true,
        });
    }
    /**
     *
     * @param {string} log
     * @param {any} metadata
     */
    debug(log, metadata) {
        this._logger.debug(log, metadata);
    }
    /**
     *
     * @param {string} log
     * @param {any} metadata
     */
    info(log, metadata) {
        this._logger.info(log, metadata);
    }
    /**
     *
     * @param {string} log
     * @param {any} metadata
     */
    warn(log, metadata) {
        this._logger.warn(log, metadata);
    }
    /**
     *
     * @param {string} log
     * @param {any} metadata
     */
    error(log, metadata) {
        this._logger.error(log, metadata);
        // send message to admin
    }
}

module.exports = Logger;
