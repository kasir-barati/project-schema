import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// allowedOrigins restrict requests from unusual source
let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3001',
    'https://example.com',
    'https://landing.example.com',
    'https://next.example.me',
    'http://localhost:8080',
    'https://admin.example.me',
    'https://admin.example.com',
    'https://next.example.com',
    'https://next-staging.example.com',
    'https://admin-staging.example.com',
    'https://other.example.com',
    'https://other.com',
    'https://sample.com',
    'https://api.payment.ir',
    'https://api.payment.ir/v1',
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
