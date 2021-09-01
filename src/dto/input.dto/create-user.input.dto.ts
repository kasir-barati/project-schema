import { Transform } from 'class-transformer';
import {
    Matches,
    IsEnum,
    IsString,
    IsOptional,
} from 'class-validator';

import {
    toPhone,
    toStringEnglishNumber,
} from '../../commons/utils/custom-convertor.util.common';
import { GenderEnum, UserRoles } from '../../models/user.model';

export class CreateUserDto {
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    phoneNumber: string;

    @IsOptional()
    @IsString({ message: 'username_should_be_string'.toUpperCase() })
    username = `ss-${Math.round(Math.random() * 100_000_000)}`;

    @IsOptional()
    @IsString({ message: 'lastName_should_be_string'.toUpperCase() })
    lastname?: string;

    @IsOptional()
    @IsString({ message: 'name_should_be_string'.toUpperCase() })
    name?: string;

    @IsOptional()
    @IsEnum(GenderEnum, {
        message: 'gender_is_not_valid'.toUpperCase(),
    })
    gender?: GenderEnum;
}

export class CreateUserByAdminDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    phoneNumber: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    gender?: GenderEnum;

    @IsOptional()
    @IsString()
    password?: string;

    @IsString()
    role: UserRoles;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    whatsappPhoneNumber: string;
}
