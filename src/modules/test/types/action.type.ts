import { IsString, IsIn } from 'class-validator';

class Action {
    @IsIn(['GET', 'POST', 'PUT', 'DELETE'], {
        message: 'FORMAT_OTHER_ACTIONS_FOR_FORM.HTTP_METHOD',
    })
    httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE';

    @IsString({
        message: 'FORMAT_OTHER_ACTIONS_FOR_FORM.NAME',
    })
    name: string;

    @IsString({
        message: 'FORMAT_OTHER_ACTIONS_FOR_FORM.ENDPOINT_PATH',
    })
    endpointPath: string;
}

export { Action };
