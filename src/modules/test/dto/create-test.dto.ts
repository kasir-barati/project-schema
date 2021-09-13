import { Type } from 'class-transformer';
import {
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { OtherActionsForForm } from '../types/other-action-for-form.type';

class CreateTestDto {
    @IsOptional()
    @IsString({
        message: 'FORMAT_FORM_NAME',
    })
    formName: string;

    @IsOptional()
    @IsObject({
        each: true,
        message: 'FORMAT_FORM_BUILDER',
    })
    formBuilder: Record<string, unknown[]>;

    @IsOptional()
    @ValidateNested()
    @Type(() => OtherActionsForForm)
    otherActionsForForm: OtherActionsForForm;
}

export { CreateTestDto };
