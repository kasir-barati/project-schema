// @ts-check
const { logger } = require('../common/log');

/**@type {import('express').ErrorRequestHandler} */
function unexpectedErrors(error, req, res, next) {
    logger('fatal', 'route', {
        message: 'An unexpected error occured',
        meta: {
            ...error,
        },
    });

    res.status(500).json({
        successful: false,
        message: 'INTERNAL_ERROR',
    });
}

module.exports = {
    unexpectedErrors,
};
