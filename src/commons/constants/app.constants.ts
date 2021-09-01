export const appConfigs = {
    PORT: process.env.PORT || 5000,
    api_address:
        process.env.API_ADDRESS || 'http://localhost:5000/api',
    db_host: process.env.MONGODB_URL || 'localhost:27018',
    db_name: 'ss-new-app',
    db_password: process.env.DB_PASSWORD || 'nieiorn4alib',
    db_username: process.env.DB_USERNAME || 'root',
    db_query: process.env.DB_QUERY || 'retryWrites=true&w=majority',
    db_uri:
        process.env.DB_URI ||
        'mongodb+srv://user:pass@test.test.mongodb.net/dbName?authSource=admin&replicaSet=atlas-0&readPreference=primary&appname=asd&ssl=true',
    client: process.env.CLIENT || 'http://localhost:3001',
    chaparak_base_url: 'https://apichaparak.test.com',
    rabbitmq_host: '',
    minio: process.env.MINIO_URL || '127.0.0.1',
    minio_access_key:
        process.env.MINIO_ACCESS_KEY ||
        '12345678912345678912345678912345678912345689',
    minio_secret_key:
        process.env.MINIO_SECRET_KEY ||
        '12345678912345678912345678912345678912345689',
    redis_host: process.env.REDIS_HOST || 'localhost',
    redis_port: process.env.REDIS_PORT || '6379',
    redis_password: process.env.REDIS_PASSWORD || '123qwe',
    payping_token:
        process.env.PAY_PING_TOKEN ||
        '12345678912345678912345678912345678912345689',
    payping_base_url: 'https://api.payping.ir/',
    nodeEnv: process.env?.NODE_ENV ?? 'development',
    superAdmin: {
        _id:
            process.env?.SUPER_ADMIN_OBJECT_ID ??
            '12345678912345678912345678912345678912345689',
        username: 'PowerfulSuperAdmin',
        password:
            process.env?.SUPER_ADMIN_PASSWORD ??
            '12345678912345678912345678912345678912345689',
    },
    defaultSupportAdmin: {
        username: 'test',
    },
};
