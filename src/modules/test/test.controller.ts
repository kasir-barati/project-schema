import {
    Get,
    Post,
    Body,
    Patch,
    Param,
    Inject,
    Delete,
    UsePipes,
    UseGuards,
    Controller,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) {}

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
