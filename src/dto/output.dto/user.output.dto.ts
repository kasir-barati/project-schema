import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { GenderEnum, User } from '../../models/user.model';

export class UserOutputDto {
    constructor(data: User) {
        this._id = data._id.toHexString();
        this.phoneNumber = data.phoneNumber;
        this.lastname = data.lastname;
        this.name = data.name;
        this.gender = data.gender;
        this.isPhoneNumberVerified = data.isPhoneNumberVerified;
        this.whatsappPhoneNumber = data!.whatsappPhoneNumber;
    }
    @IsString()
    _id: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    lastname: string;

    @IsString()
    name: string;
    gender: GenderEnum;

    @IsBoolean()
    isPhoneNumberVerified: boolean;

    @IsOptional()
    @IsString()
    whatsappPhoneNumber?: string;
}

export class UserOutputDtoByAdmin {
    constructor(data: User) {
        this._id = data._id.toHexString();
        this.phoneNumber = data.phoneNumber;
        this.lastname = data.lastname;
        this.name = data.name;
        this.gender = data.gender;
        this.isPhoneNumberVerified = data.isPhoneNumberVerified;
        this.role = data.role;
        this.verificationCode = data.verificationCode;
        this.whatsappPhoneNumber = data!.whatsappPhoneNumber;
    }
    @IsString()
    _id: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    lastname: string;

    @IsString()
    name: string;
    gender: GenderEnum;

    @IsBoolean()
    isPhoneNumberVerified: boolean;

    @IsString()
    role: string;

    @IsString()
    verificationCode: string;

    @IsOptional()
    @IsString()
    whatsappPhoneNumber?: string;
}
