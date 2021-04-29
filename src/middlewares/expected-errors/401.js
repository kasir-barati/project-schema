// @ts-check
const { UnauthorizedError } = require('express-jwt');
const { logger } = require('../../common/log');
const { errorMessageGenerator } = require('../validator');

const {
    envs: { common: commonEnvs },
} = require('../../configs/env');

/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (!(error instanceof UnauthorizedError)) {
        return next(error);
    }

    logger('warning', 'route', {
        message: error.message,
        meta: {
            ...error,
        },
    });

    const response = {
        successful: false,
        message: errorMessageGenerator('authentication', 'required'),
    };

    if (commonEnvs.nodeEnv === 'development') {
        response.debug = {
            ...error,
        };
    }

    res.status(error.status).json(response);
}

module.exports = {
    expectedErrors,
};
