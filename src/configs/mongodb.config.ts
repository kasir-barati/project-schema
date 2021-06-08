import { MongooseModuleOptions } from '@nestjs/mongoose';

function mongodbConfigsGenerator():
    | { mongodbConfigs: MongooseModuleOptions }
    | never {
    const configs = {
        username: process.env?.MONGODB_USERNAME,
        password: process.env?.MONGODB_PASSWORD,
        database: process.env?.MONGODB_DATABASE,
        host: process.env?.MONGODB_HOST ?? 'localhost',
        port: Number(process.env?.MONGODB_PORT) ?? 27017,
    };

    const mongodbConfigs: {
        mongodbConfigs: MongooseModuleOptions;
    } = {
        mongodbConfigs: {
            uri: `mongodb://${configs.username}:${configs.password}@${configs.host}:${configs.port}/${configs.database}`,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
    };

    return mongodbConfigs;
}

export { mongodbConfigsGenerator };
