// @ts-check
const express = require('express');

const { router: testRouter } = require('./routers/test.router');

const {
    unexpectedErrors,
} = require('./middlewares/unexpected-errors');
const {
    expectedErrors: mongoDbErrors,
} = require('./middlewares/expected-errors/mongo-errors');
const {
    expectedErrors: validationErrors,
} = require('./middlewares/expected-errors/422');
const {
    expectedErrors: authorizationErrors,
} = require('./middlewares/expected-errors/403');
const {
    expectedErrors: authenticationErrors,
} = require('./middlewares/expected-errors/401');
const {
    expectedErrors: invalidJsonErrors,
} = require('./middlewares/expected-errors/400');
const {
    expectedErrors: documentNotFoundErrors,
} = require('./middlewares/expected-errors/404');
const {
    endpointNotFound,
} = require('./middlewares/endpoint-not-found');

const {
    envs: { expressApp },
} = require('./configs/env');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(testRouter);

app.use(endpointNotFound);
app.use(validationErrors);
app.use(authorizationErrors);
app.use(authenticationErrors);
app.use(documentNotFoundErrors);
app.use(mongoDbErrors);
app.use(invalidJsonErrors);
app.use(unexpectedErrors);

function listen() {
    return new Promise((resolve, reject) => {
        app.listen(Number(expressApp.port), expressApp.host, () => {
            resolve(expressApp.port);
        }).on('error', reject);
    });
}

module.exports = {
    app,
    listen,
};
