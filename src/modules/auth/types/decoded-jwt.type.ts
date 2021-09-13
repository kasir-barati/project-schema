export interface JwtPayload {
    id: string; // object id
    exp: number; // timestamp
    iat: number; // timestamp
    roles: string[];
}
