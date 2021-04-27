interface IAccessToken {
    id: string;
    iat: Date;
    eat: Date;
}

interface IRefreshToken {
    id: string;
    iat: Date;
    eat: Date;
}

export { IAccessToken, IRefreshToken };
