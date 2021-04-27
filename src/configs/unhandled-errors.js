// @ts-check
const { logger } = require('../common/log');

function config() {
    process.on('uncaughtException', (error) => {
        logger('fatal', 'big', {
            message: 'uncaughtException',
            meta: {
                ...error,
            },
        });
    });

    process.on('unhandledRejection', (error) => {
        logger('fatal', 'big', {
            message: 'uncaughtException',
            meta: {
                ...error,
            },
        });
    });
}

module.exports = {
    config,
};
