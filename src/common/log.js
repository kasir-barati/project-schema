//@ts-check
const { textSync } = require('figlet');

const prefix = {
    big: '',

    '': '.',

    db: '💽',
    server: '🌐',
    auth: '🔑',
    mail: '📩',
    config: '⚙️',
    import: '⏫',
    route: '🔀',
    fs: '📁',

    success: '☑️',
    info: '^ℹ',
    warning: '⚠️',
    error: '❌',
    fatal: '💩',
};

const seperator =
    '---------------------------------------------------------------------------------\n';

/**
 *
 * @param {'success' | 'info'| 'warning' | 'error' | 'fatal' | ''} level
 * @param {'db' | 'server' | 'auth' | 'mail' | 'config' | 'import' | 'route' | 'fs' | 'big'} subject
 * @param {object} meta
 * @param {any} [meta.meta]
 * @param {string} meta.message
 * @param {Error | any} e
 */
function logger(level, subject, meta, e = null) {
    const out = [];

    if (subject === 'big') {
        out.push(textSync(meta.message, 'Cybermedium'));
        if (meta.meta !== undefined) {
            out.push(meta.meta);
        }
    } else {
        if (level === 'error' || level === 'fatal') {
            out.push(textSync(level));
            if (!e) e = new Error();
        }

        out.push(
            //prettier-ignore
            `${prefix[level ?? '']} .${prefix[subject ?? '']} .${meta.message ?? ''}`,
            ...(e ? [e] : []),
        );

        if (meta.meta !== undefined) {
            out.push(meta.meta);
        }

        if (level === 'error' || level === 'fatal') {
            out.push(seperator);
        }
    }

    out.forEach((val) => console.log(val));
}

module.exports = {
    logger,
};
