// @ts-check
const { logger } = require('../../common/log');

const {
    envs: { common: commonEnvs },
} = require('../../configs/env');

/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (error.name !== 'MongoError') {
        return next(error);
    }

    logger('error', 'db', {
        message: 'Error occured while query execution in MongoDB.',
        meta: {
            ...error,
        },
    });

    const response = {
        successful: false,
        message: 'INTERNAL_ERROR',
    };

    if (commonEnvs.nodeEnv === 'development') {
        response.debug = {
            ...error,
        };
    }

    res.status(500).json(response);
}

module.exports = {
    expectedErrors,
};
