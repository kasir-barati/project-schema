import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';
import { GenderEnum, UserRoles } from '../../models/user.model';
import {
    toPhone,
    toStringEnglishNumber,
} from '../../commons/utils/custom-convertor.util.common';

export class UpdateUserDto {
    @IsOptional()
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: GenderEnum;

    @IsOptional()
    @IsBoolean()
    isPhoneNumberVerified?: boolean;
}

export class UpdateUserByAdminDto {
    @IsOptional()
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: GenderEnum;

    @IsOptional()
    @IsBoolean()
    isPhoneNumberVerified?: boolean;

    @IsOptional()
    @IsEnum(UserRoles)
    role: UserRoles;
}
