/**
 *
 * @param {string} string
 * @returns {string}
 */
function persianNumberToEnglish(string) {
    string = String(string);
    return string?.replace(/[۰-۹]/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit),
    );
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
function arabicNumberToEnglish(string) {
    string = String(string);
    return string?.replace(/[٠-٩]/g, (digit) =>
        '٠١٢٣٤٥٦٧٨٩'.indexOf(digit),
    );
}

module.exports = {
    arabicNumberToEnglish,
    persianNumberToEnglish,
};
