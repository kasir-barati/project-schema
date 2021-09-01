import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum } from 'class-validator';

import { toEnglishNumber } from '../../commons/utils/custom-convertor.util.common';

enum SortBaseOn {
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    expiredAt = 'expiredAt',
    activatedAt = 'activatedAt',
}

export class PaginationDto {
    @IsOptional()
    @Transform(({ value }) => toEnglishNumber(value))
    @IsNumber(
        { allowInfinity: false, allowNaN: false },
        { message: 'page_should_be_number'.toUpperCase() },
    )
    page = 1;

    @IsOptional()
    @Transform(({ value }) => toEnglishNumber(value))
    @IsNumber(
        { allowInfinity: false, allowNaN: false },
        { message: 'limit_should_be_number'.toUpperCase() },
    )
    limit = 10;

    @IsOptional()
    @Transform(({ value }) => toEnglishNumber(value))
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'sort_should_be_number'.toUpperCase() },
    )
    sort = -1;

    @IsOptional()
    @IsEnum(SortBaseOn, {
        message: 'sortBaseOn_is_not_valid'.toUpperCase(),
    })
    sortBaseOn = SortBaseOn.createdAt;
}
