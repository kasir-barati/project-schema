import { authConfigs } from './types/auth.type';

function authConfigsGenerator(): { authConfigs } | never {
    const authConfigs: { authConfigs: authConfigs } = {
        authConfigs: {
            userSecret: process.env?.JWT_USER_SECRET,
            adminSecret: process.env?.JWT_USER_SECRET,
        },
    };
    return authConfigs;
}

export { authConfigsGenerator };
