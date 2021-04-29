// @ts-check
// Import models or repositories

const {
    envs: { common: commonEnvs, seederData },
} = require('../configs/env');

/**
 *
 * @returns {Promise<void>}
 */
async function insert() {
    if (commonEnvs.nodeEnv === 'development') {
        // insert some dummy data
    }
}

module.exports = {
    insert,
};
