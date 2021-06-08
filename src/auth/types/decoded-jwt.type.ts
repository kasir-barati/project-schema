interface DecodedAdmin {
    admin: boolean;
    username: string;
    id: string; // object id
    exp: number; // timestamp
    iat: number; // timestamp
}

interface DecodedUser {
    contractor: boolean;
    phoneNumber: string;
    step: 'first-sign';
    id: string; // object id
    exp: number; // timestamp
    iat: number; // timestamp
}

export { DecodedAdmin, DecodedUser };
