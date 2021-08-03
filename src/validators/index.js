// @ts-check
const {
    strictValidatorChain,
    errorMessageGenerator,
    mongoIdValidator,
    optionalValidatorChain,
} = require('../middlewares/validator');
const {
    arabicNumberToEnglish,
    persianNumberToEnglish,
} = require('../common/custom-convertors');

/**
 *
 * @param {string} fieldName
 */
function testValidator(fieldName) {
    return strictValidatorChain(fieldName)
        .isArray()
        .withMessage(errorMessageGenerator(fieldName, 'is_no_array'));
}

/**
 *
 * @param {string} fieldName
 */
function phoneNumberValidator(fieldName) {
    return strictValidatorChain(fieldName)
        .customSanitizer(arabicNumberToEnglish)
        .customSanitizer(persianNumberToEnglish)
        .customSanitizer((phoneNumber, { req }) => {
            req.phoneNumber = phoneNumber;
            return Promise.resolve();
        })
        .isNumeric()
        .withMessage(errorMessageGenerator(fieldName, 'is_not_number'))
        .bail();
}

module.exports = {
    /**@type {import('express').RequestHandler[]} */
    testValidator: [
        testValidator('test'),
        mongoIdValidator('userId'),
        phoneNumberValidator('phoneNumber'),
    ],
};
