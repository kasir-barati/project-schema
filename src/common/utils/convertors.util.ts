import persianJs from 'persianjs';
import PhoneNumber from 'awesome-phonenumber';

export function toEnglishNumber(value: number): number {
    const convertedString = persianJs(String(value))
        .toEnglishNumber()
        .toString();

    return Number(convertedString);
}

export function toStringEnglishNumber(value: string) {
    return persianJs(value).toEnglishNumber().toString();
}

export function toPhone(value: string): boolean | string {
    if (typeof value !== 'string') {
        return false;
    }

    const parsedPhoneNumber = new PhoneNumber(value, 'IR');

    if (
        !parsedPhoneNumber.isValid() ||
        !parsedPhoneNumber.isMobile()
    ) {
        return false;
    }

    return parsedPhoneNumber.getNumber('e164').replace('+98', '0');
}

export function kilometerToMile(number: number): number {
    return number * 0.621371192;
}

export function mileToKilometer(number: number): number {
    return number * 1609.344;
}
