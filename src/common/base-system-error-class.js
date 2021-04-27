// @ts-check

class BaseSystemError extends Error {
    /**
     *
     * @param {string} errorName
     * @param {string} message
     */
    constructor(errorName, message) {
        super(message);
        this.name = errorName;
    }
}

module.exports = {
    BaseSystemError,
};
