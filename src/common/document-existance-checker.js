// @ts-check
const { DocumentNotFound } = require('./error-response');

/**
 *
 * @param {any} document
 * @param {object} options
 * @param {object} options.collectioName
 * @param {object} options.fieldName
 * @param {object} [options.fieldValue]
 * @throws {DocumentNotFound}
 * @returns {void}
 */
function documentExistanceChecker(document, options) {
    if (!document) {
        throw new DocumentNotFound(options.collectioName, {
            fieldName: options.fieldName,
            fieldValue: options?.fieldValue ?? 'NO_MATCH_VALUE',
        });
    }
}

module.exports = {
    documentExistanceChecker,
};
