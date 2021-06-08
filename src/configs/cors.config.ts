import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// allowedOrigins restrict requests from unusual source
let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3001',
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
    'null',
];

function corsConfigsGenerator(): { corsConfigs } | never {
    const corsConfigs: CorsOptions = {
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    };
    return { corsConfigs };
}

export { corsConfigsGenerator };
