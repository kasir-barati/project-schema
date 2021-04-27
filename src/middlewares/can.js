// @ts-check

/**
 *
 * @param {'admin' | 'contractor'} requiredRole
 * @returns {import('express').RequestHandler}
 */
function can(requiredRole) {
    /**@type {import('express').RequestHandler} */
    return function canMiddleware(req, res, next) {
        const { payload } = req;

        if (!payload[requiredRole]) {
            res.status(403).json({
                successful: false,
                message: 'ONLY_ADMINS_ALLOWED',
            });
        } else {
            next();
        }
    };
}

module.exports = {
    can,
};
