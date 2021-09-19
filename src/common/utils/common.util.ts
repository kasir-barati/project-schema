export function assert(
    value: any,
    errorMessage: string,
): asserts value {
    if (!value) {
        throw new Error(`Assertion failed - ${errorMessage}`);
    }
}
