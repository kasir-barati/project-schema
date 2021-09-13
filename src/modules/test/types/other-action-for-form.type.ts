import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Action } from './action.type';

class OtherActionsForForm {
    @IsString({
        message: 'FORMAT_OTHER_ACTIONS_FOR_FORM.NAME',
    })
    name: string;

    @ValidateNested()
    @Type(() => Action)
    action: Action;
}

export { OtherActionsForForm };
