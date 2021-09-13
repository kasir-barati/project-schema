export enum NodeEnv {
    development = 'development',
    production = 'production',
}
interface webAppConfigs {
    nodeEnv: NodeEnv;
    sa: {
        username: string;
        password: string;
    };
    host: string;
    port: number;
    exposedPort: number;
    swaggerRoute: string;
}

export { webAppConfigs };
