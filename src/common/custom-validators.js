// @ts-check
const _ = require('lodash');

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );
}

/**
 * /^
 * (?=.*\d)          // should contain at least one digit
 * (?=.*[a-z])       // should contain at least one lower case
 * (?=.*[A-Z])       // should contain at least one upper case
 * [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
 * $/
 */
/**
 *
 * @param {string} password
 * @returns {boolean}
 */
function isPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        password,
    );
}

/**
 *
 * @param {string} str
 * @param {number} length
 * @returns {boolean}
 */
function isSmallerThan(str, length) {
    return str.length < length;
}

/**
 *
 * @param {string} str
 * @param {number} length
 * @returns {boolean}
 */
function isGreaterThan(str, length) {
    return str.length > length;
}

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
function isAlpha(str) {
    return /[a-zA-Z\u0600-\u06FF\s]+/.test(str);
}

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
function isAlphanumeric(str) {
    return /[a-zA-Z0-9\s]+/.test(str);
}

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
function isIranianPhoneNumber(str) {
    return /(0|\+98)?([ ]|,|-|[()]){0,2}9[0|1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/.test(
        this.val,
    );
}

/**
 *
 * @param {any} num number or string
 * @returns {boolean}
 */
function isNumeric(num) {
    return _.isNumber(num);
}

/**
 *
 * @param {string} url
 * @returns {boolean}
 */
function isUrl(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        url,
    );
}

/**
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
function compareEnglish(str1, str2) {
    if (
        str1.localeCompare(str2, 'en', { sensitivity: 'base' }) === 1
    ) {
        return true;
    }
    return false;
}

module.exports = {
    isUrl,
    isAlpha,
    isEmail,
    isNumeric,
    isPassword,
    isSmallerThan,
    isGreaterThan,
    isAlphanumeric,
    compareEnglish,
    isIranianPhoneNumber,
};
