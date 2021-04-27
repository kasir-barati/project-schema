// @ts-check
const _ = require('lodash');

const { logger } = require('../../common/log');

const {
    envs: { common: commonConfigs },
} = require('../../configs/env');

// if express.json throws any error or the JSON.parse throws error we catch it here
/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (
        !(
            error instanceof SyntaxError &&
            ((error.status === 400 && 'body' in error) ||
                /^Unexpected token/.test(error.message))
        )
    ) {
        return next(error);
    }

    logger('info', 'route', {
        message: 'Bad query string/request body recieved',
        meta: {
            originalUrl: req.originalUrl,
            body: req.body,
            query: req.query,
            ...error,
        },
    });

    const response = {
        successful: false,
        message: 'BAD_REQUEST',
    };

    if (commonConfigs.nodeEnv === 'development') {
        response.debug = {
            ...error,
        };
    }

    res.status(error?.status ?? 400).json(response);
}

module.exports = {
    expectedErrors,
};
