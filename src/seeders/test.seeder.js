// @ts-check
// Import models or repositories

const {
    envs: { common: commonConfig, seederData },
} = require('../configs/env');

/**
 *
 * @returns {Promise<void>}
 */
async function insert() {
    if (commonConfig.nodeEnv === 'development') {
        // insert some dummy data
    }
}

module.exports = {
    insert,
};
