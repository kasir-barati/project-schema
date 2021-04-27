// @ts-check
const mongoose = require('mongoose');

const {
    envs: { mongodb },
} = require('./env');

/**
 * @returns {Promise<typeof mongoose>}
 */
function connect() {
    return mongoose.connect(
        `mongodb://${mongodb.username}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.database}`,
        {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
    );
}

module.exports = {
    connect,
};
