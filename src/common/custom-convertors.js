// @ts-check
/**
 *
 * @param {string} string
 * @returns {string}
 */
function persianNumberToEnglish(string) {
    string = String(string);
    return string?.replace(/[۰-۹]/g, (digit) =>
        String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)),
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
        String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)),
    );
}

module.exports = {
    arabicNumberToEnglish,
    persianNumberToEnglish,
};
