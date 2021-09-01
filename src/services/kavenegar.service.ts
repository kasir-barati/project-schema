import KaveNeegar from 'kavenegar';

export const kaveNeagar = KaveNeegar.KavenegarApi({
    apiKey: '123456789123456789123456789123456789123456789',
});

export const contractor_verfication = (
    phoneNumber: string,
    code: string,
) => {
    return {
        template: 'verification',
        token: code,
        receptor: phoneNumber,
    };
};

const kave = KaveNeegar.KavenegarApi({
    apikey: '123456789123456789123456789123456789123456789',
});

// FIXME: change any to a specific type
export function promisifiedKave(payload: any) {
    return new Promise((resolve, reject) => {
        kave.VerifyLookup(
            payload,
            (response: any, status: any, message: any) => {
                resolve({ response, status, message });
            },
        );
    });
}
