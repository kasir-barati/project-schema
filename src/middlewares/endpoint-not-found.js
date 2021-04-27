// @ts-check
const { logger } = require('../common/log');

/**@type {import('express').RequestHandler} */
function endpointNotFound(req, res, next) {
    logger('warning', 'route', {
        message: `Endpoint not found: ${req.originalUrl}.`,
        meta: {
            ip: req.ip,
            method: req.method,
            originalUrl: req.originalUrl,
            userAgent: req.get('user-agent'),
        },
    });

    res.status(404).json({
        successful: false,
        message: 'ENDPOINT_NOT_FOUND',
    });
}

module.exports = {
    endpointNotFound,
};
