import 'reflect-metadata';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import {
    Action,
    getMetadataArgsStorage,
    RoutingControllersOptions,
    createExpressServer,
} from 'routing-controllers';
import cors from 'cors';
import 'swagger-node-express';
import * as swaggerUiExpress from 'swagger-ui-express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
    defaultMetadataStorage,
} = require('class-transformer/cjs/storage');

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv');
    // import * as dotenv from 'dotenv';
    dotenv.config();
}

import { logger } from './commons/utils/winston.util.common';
import { appConfigs } from './commons/constants/app.constants';
import { connectToMongodb } from './commons/configs/connect-to-mongodb.config';
import { connectToRabitMq } from './commons/configs/rabitmq.config';
import './jobs/defineTasks';
import './jobs/marketingSms';

import { CustomErrorHandler } from './middlewares/error.middleware';
import { UserController } from './controllers/user.controller';
import { JwtPayload } from './commons/types/jwt-payload.type';

connectToRabitMq();

// allowedOrigins restrict requests from unusual source
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3001',
    'http://localhost:5000',
    'https://salamsakhteman.com',
    'https://landing.salamsakhteman.com',
    'https://next.aliebrahimi.me',
    'http://localhost:8080',
    'https://adminext.aliebrahimi.me',
    'https://adminext.salamsakhteman.com',
    'https://next.salamsakhteman.com',
    'https://next-staging.salamsakhteman.com',
    'https://adminext-staging.salamsakhteman.com',
    'https://mashinegheimat.salamsakhteman.com',
    'https://ostanaghash.com',
    'https://gheimata.com',
    'https://khoobine.com',
    'https://lead-staging.salamsakhteman.com',
    'https://api.payping.ir',
    'https://api.payping.ir/v1',
    'https://rabi-staging.salamsakhteman.com',
    'null',
];

const routingControllersOptions: RoutingControllersOptions = {
    controllers: [UserController],
    middlewares: [
        CustomErrorHandler,
        cors({
            origin: function (origin, callback) {
                // allow requests with no origin
                // (like mobile apps or curl requests)
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg =
                        'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
        }),
        swaggerUiExpress.serve,
        swaggerUiExpress.setup(spec),
    ],
    routePrefix: '/api',
    defaultErrorHandler: false,
    currentUserChecker: (action: Action): JwtPayload => {
        return action.request.payload as JwtPayload;
    },
    validation: {
        whitelist: true,
    },
};
const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
});
// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
    storage,
    routingControllersOptions,
    {
        components: {
            schemas,
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header',
                },
            },
        },
        info: {
            description:
                'Generated with `routing-controllers-openapi`',
            title: 'A sample API',
            version: '1.0.0',
        },
    },
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
createExpressServer(routingControllersOptions);

connectToMongodb(logger);
