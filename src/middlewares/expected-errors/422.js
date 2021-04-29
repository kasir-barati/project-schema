// @ts-check
const { logger } = require('../../common/log');
const { UnprocessableEntry } = require('../../common/error-response');

const {
    envs: { common: commonEnvs },
} = require('../../configs/env');

/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (!(error instanceof UnprocessableEntry)) {
        return next(error);
    }

    logger('warning', 'route', {
        message: 'Error occured during the request validation',
        meta: {
            ...error,
        },
    });

    const response = {
        successful: false,
        message: error.validationErrors,
    };

    if (commonEnvs.nodeEnv === 'development') {
        response.debug = {
            ...error,
        };
    }

    res.status(error.statusCode).json(response);
}

module.exports = {
    expectedErrors,
};
