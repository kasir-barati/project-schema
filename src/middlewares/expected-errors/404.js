// @ts-check
const { logger } = require('../../common/log');
const { errorMessageGenerator } = require('../validator');
const {
    DocumentNotFound,
    ForeignKeyConstraintsError,
} = require('../../common/error-response');

const {
    envs: { common: commonEnvs },
} = require('../../configs/env');

/**@type {import('express').ErrorRequestHandler} */
function expectedErrors(error, req, res, next) {
    if (
        !(
            error instanceof DocumentNotFound ||
            error instanceof ForeignKeyConstraintsError
        )
    ) {
        return next(error);
    }

    logger('warning', 'route', {
        message:
            'Error occured during the searching for document in database',
        meta: {
            ...error,
        },
    });
    const response = {
        successful: false,
        message: errorMessageGenerator(
            error.collectionName.toUpperCase(),
            'not_found',
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
