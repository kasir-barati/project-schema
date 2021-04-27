// @ts-check
require('./configs/unhandled-errors').config();

const { logger } = require('./common/log');
// Seeders
const { insert: insertSeeder } = require('./seeders');

// dummy data
const { insertDummy } = require('./dummy-data/index');

const expressApp = require('./app');
const mongodbConfig = require('./configs/mongodb');

mongodbConfig
    .connect()
    .then(() => insertSeeder())
    .then(() => insertDummy())
    .then(() => {
        return expressApp.listen().catch((error) => {
            logger(
                'error',
                'server',
                {
                    message:
                        error?.message ??
                        `Server could not starts on the specified port`,
                },
                error,
            );
            process.exit();
        });
    })
    .then((port) => {
        logger('info', 'server', {
            message: `server connected on ${port}`,
        });
    })
    .catch((error) => {
        logger(
            'error',
            'db',
            {
                message:
                    error?.message ??
                    'Some problem happended during the connecting/inserting to the MongoDB',
            },
            error,
        );
        process.exit();
    });
