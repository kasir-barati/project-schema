// @ts-check
const {
    strictValidatorChain,
    errorMessageGenerator,
    mongoIdValidator,
    optionalValidatorChain,
} = require('../middlewares/validator');

/**
 *
 * @param {string} fieldName
 */
function testValidator(fieldName) {
    return strictValidatorChain(fieldName)
        .isArray()
        .withMessage(errorMessageGenerator(fieldName, 'is_no_array'));
}

module.exports = {
    /**@type {import('express').RequestHandler[]} */
    testValidator: [
        testValidator('test'),
        mongoIdValidator('userId'),
    ],
};
