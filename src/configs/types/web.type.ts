interface webAppConfigs {
    nodeEnv: string;
    sa: {
        username: string;
        password: string;
    };
    host: string;
    port: number;
    exposedPort: number;
}

export { webAppConfigs };
