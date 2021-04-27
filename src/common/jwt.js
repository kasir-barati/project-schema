// @ts-check
const path = require('path');
const { promises: fsPromises } = require('fs');

const jsonwebtoken = require('jsonwebtoken');
const {
    JsonWebTokenError,
    NotBeforeError,
    TokenExpiredError,
} = jsonwebtoken;

const PRIVATE_KEY_PATH = path.join(
    __dirname,
    '..',
    '..',
    'keys',
    'id_rsa_private.pem',
);
const PUBLIC_KEY_PATH = path.join(
    __dirname,
    '..',
    '..',
    'keys',
    'id_rsa_public.pem',
);

/**
 *
 * @param {object} payload
 * @param {string} expiresIn
 * @returns {Promise<string>}
 */
async function generateAccessToken(payload, expiresIn) {
    const privateKey = await fsPromises.readFile(PRIVATE_KEY_PATH);

    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(
            payload,
            privateKey,
            {
                expiresIn,
                algorithm: 'RS256',
            },
            (error, accessToken) => {
                if (error) reject(error);
                else resolve(accessToken);
            },
        );
    });
}

/**
 *
 * @param {string} token
 * @throws { JsonWebTokenError | NotBeforeError | TokenExpiredError }
 * @returns {Promise}
 */
async function verifyToken(token) {
    const publicKey = await fsPromises.readFile(PUBLIC_KEY_PATH);

    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, publicKey, (error, decoded) => {
            if (error) reject(error);
            else resolve(decoded);
        });
    });
}

/**
 *
 * @param {string} token
 */
function decodeToken(token) {
    return jsonwebtoken.decode(token);
}

module.exports = {
    generateAccessToken,
    decodeToken,
    verifyToken,
};
