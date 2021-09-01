import { IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

import {
    toPhone,
    toStringEnglishNumber,
} from '../../commons/utils/custom-convertor.util.common';

export class LoginDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => toStringEnglishNumber(value))
    @Transform(({ value }) => toPhone(value))
    @Matches(/^(0098)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, {
        message:
            'phoneNumber_should_be_iranian_phone_number'.toUpperCase(),
    })
    phoneNumber: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;
}
