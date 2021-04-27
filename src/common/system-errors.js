// @ts-check
const { BaseSystemError } = require('./base-system-error-class');

const { logger } = require('./log');

class UndefinedEnvError extends BaseSystemError {
    /**
     *
     * @param {string} erroName
     * @param {string} message
     * @param {object} envs
     */
    constructor(erroName, message, envs) {
        super(erroName, message);
        logger('error', 'config', {
            message: this.message,
            meta: envs,
        });
    }
}

module.exports = { UndefinedEnvError };
