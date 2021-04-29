// @ts-check
const { logger } = require('../../common/log');
const { errorMessageGenerator } = require('../validator');
const { UnauthorizedAccess } = require('../../common/error-response');

const {
    envs: { common: commonEnvs },
} = require('../../configs/env');

/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (!(error instanceof UnauthorizedAccess)) {
        return next(error);
    }

    logger('warning', 'route', {
        message: 'Unauthorized access to the resource',
        meta: {
            ...error,
        },
    });

    const response = {
        successful: false,
        message: errorMessageGenerator(
            error.resource,
            'forbiden_access',
        ),
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
