// @ts-check
const { insert: insertTest } = require('./test');

/**
 * @returns {Promise<void>}
 */
async function insert() {
    await insertTest();
}

module.exports = {
    insert,
};
