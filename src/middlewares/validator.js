// @ts-check
const { isValidObjectId } = require('mongoose');
const { validationResult, check } = require('express-validator');

const { UnprocessableEntry } = require('../common/error-response');

/**@type {import('express').RequestHandler} */
function validate(req, res, next) {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        return next();
    }

    /**@type {string[]} */
    const errors = [];

    validationErrors.array().forEach((validationError) => {
        if (validationError.nestedErrors) {
            validationError.nestedErrors.forEach((validationErr) => {
                //@ts-ignore
                if (validationErr?.msg) {
                    //@ts-ignore
                    errors.push(String(validationErr.msg));
                }
            });
        } else {
            errors.push(String(validationError.msg));
        }
    });

    next(new UnprocessableEntry(errors));
}

/**
 *
 * @param {string} field
 * @param {string} message
 */
function errorMessageGenerator(field, message) {
    return `${field.toUpperCase()}_${message.toUpperCase()}`;
}

/**
 *
 * @param {string} field
 */
function strictValidatorChain(field) {
    return check(field)
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(errorMessageGenerator(field, 'EMPTY'))
        .bail()

        .notEmpty({ ignore_whitespace: true })
        .withMessage(errorMessageGenerator(field, 'EMPTY'))
        .bail();
}

/**
 *
 * @param {string} field
 */
function optionalValidatorChain(field) {
    return check(field).optional({
        nullable: true,
        // checkFalsy: true,
    });
}

/**
 *
 * @param {string} fieldName
 */
function mongoIdValidator(fieldName) {
    return strictValidatorChain(fieldName)
        .custom((id) => {
            if (!isValidObjectId(id)) {
                return Promise.reject();
            }
            return Promise.resolve();
        })
        .withMessage(errorMessageGenerator(fieldName, 'is_invalid'))
        .bail();
}

module.exports = {
    validate,
    mongoIdValidator,
    strictValidatorChain,
    errorMessageGenerator,
    optionalValidatorChain,
};
