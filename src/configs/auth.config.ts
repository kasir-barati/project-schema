function authConfigsGenerator(): { authConfigs } | never {
    const authConfigs = {
        authConfigs: {
            userSeret: process.env?.JWT_USER_SECRET,
            adminSecret: process.env?.JWT_USER_SECRET,
        },
    };
    return authConfigs;
}

export { authConfigsGenerator };
