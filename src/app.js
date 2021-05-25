// @ts-check
const express = require('express');

const { router: testRouter } = require('./routers/test.router');

const {
    envs: { expressApp },
} = require('./configs/env');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(testRouter);

app.use(require('./middlewares/endpoint-not-found').endpointNotFound);
app.use(require('./middlewares/expected-errors/422').expectedErrors);
app.use(require('./middlewares/expected-errors/403').expectedErrors);
app.use(require('./middlewares/expected-errors/401').expectedErrors);
app.use(require('./middlewares/expected-errors/404').expectedErrors);
app.use(
    require('./middlewares/expected-errors/mongo-errors')
        .expectedErrors,
);
app.use(require('./middlewares/expected-errors/400').expectedErrors);
app.use(require('./middlewares/unexpected-errors').unexpectedErrors);

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
