import { Logger } from 'winston';
import mongoose from 'mongoose';

import { mongodbConfigs } from '../constants/mongodb.constant';
import { CustomLogger } from '../utils/winston.util.common';

export async function connectToMongodb(logger: CustomLogger) {
    await mongoose.connect(mongodbConfigs.connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    logger.info('MongoDB database connected.', {
        meta: { connectionString: mongodbConfigs.connectionString },
    });
}
