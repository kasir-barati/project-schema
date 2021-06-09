import { IsEmpty, IsString } from 'class-validator';

class CreateTestDto {
    @IsEmpty({
        message: 'EMPTY_NAME',
    })
    @IsString({
        message: 'FORMAT_NAME',
    })
    name: string;
}

export { CreateTestDto };
