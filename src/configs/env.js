// @ts-check
const { UndefinedEnvError } = require('../common/system-errors');
const { logger } = require('../common/log');

const envs = {
    common: {
        nodeEnv: process.env?.NODE_ENV ?? 'default-node-env',
    },
    jwt: {
        userSecret:
            process.env?.JWT_USER_SECRET ?? 'default-user-secret',
        adminSecret:
            process.env?.JWT_ADMIN_SECRET ?? 'default-admin-secret',
    },
    expressApp: {
        port: Number(process.env?.APP_PORT) ?? 3000,
        host: process.env?.APP_HOST ?? '0.0.0.0',
        name: process.env?.APP_NAME ?? 'default-app-name',
    },
    mongodb: {
        host: process.env?.MONGODB_HOST,
        port: Number(process.env?.MONGODB_EXPOSED_PORT),
        username: process.env?.MONGODB_USERNAME,
        password: process.env?.MONGODB_PASSWORD,
        database: process.env?.MONGODB_DATABASE,
    },
    dummyData: {
        adminId: '607ff8325dd29ad115ed4ce6',
        userId: '607ff8056c2acc946e06bf2f',
    },
    seederData: {
        supportLeadDepartmentId: '6083b47e5d467e1af5908504',
        supportContractorDepartmentId: '6083b4aa1c03540d434964ad',
    },
};

for (let item in envs) {
    for (let env in envs[item]) {
        if (
            typeof envs[item][env] === 'string' &&
            envs[item][env]?.match(/^default/)
        ) {
            logger('warning', 'config', {
                message:
                    'This environment variable could not read from the env file',
                meta: {
                    [item]: { [env]: envs[item][env] },
                },
            });
        } else if (envs[item][env] === undefined) {
            throw new UndefinedEnvError(
                'E_UNDEFINED_ENV',
                'Some of the environment variable/s is/are undefined',
                envs,
            );
        }
    }
}

module.exports = { envs };
