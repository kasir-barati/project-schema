import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

class CreateTestDto {
    @IsNotEmpty({
        message: 'EMPTY_NAME',
    })
    @IsString({
        message: 'FORMAT_NAME',
    })
    name: string;
}

export { CreateTestDto };
