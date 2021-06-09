import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTestDto: CreateTestDto) {
        return this.testService.create(createTestDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.testService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTestDto: UpdateTestDto,
    ) {
        return this.testService.update(+id, updateTestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testService.remove(+id);
    }
}
