export const mongodbConfigs = {
    host: process.env.MONGODB_URL || 'localhost:27018',
    name: process.env.MONGODB_DATABASE_NAME || 'ss-new-app',
    password: process.env.MONGODB_PASSWORD || 'nieiorn4alib',
    username: process.env.MONGODB_USERNAME || 'root',
    connectionString:
        process.env.MONGODB_CONNECTION_STRING ||
        'mongodb+srv://user:pass@test.test.mongodb.net/dbName?authSource=admin&replicaSet=atlas-0&readPreference=primary&appname=this-app',
};
