// @ts-check
const { logger } = require('../common/log');

/**
 *
 * @param {'info'|'route'|'warn'|'error'} level
 * @param {string} scope
 * @param {string} message
 */
function loggerMiddleware(level, scope, message) {
    /**@type {import('express').RequestHandler} */
    return (req, res, next) => {
        switch (level) {
            case 'error':
                logger('error', 'route', {
                    message: `${message}. ${scope}`,
                });
                break;
            case 'info':
            case 'route':
                logger('info', 'route', {
                    message: `${message}. ${scope}`,
                });
                break;
            case 'warn':
                logger('warning', 'route', {
                    message: `${message}. ${scope}`,
                });
                break;
        }
        next();
    };
}

module.exports = { loggerMiddleware };
