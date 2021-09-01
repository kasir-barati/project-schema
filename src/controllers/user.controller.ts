import {
    Body,
    CurrentUser,
    Delete,
    ForbiddenError,
    Get,
    HttpCode,
    JsonController,
    NotFoundError,
    Param,
    Post,
    Put,
    QueryParams,
    UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Response } from '../commons/models/response.model';
import { JwtPayload } from '../commons/types/jwt-payload.type';
import { User, UserModel, UserRoles } from '../models/user.model';
import { CreateUserByAdminDto } from '../dto/input.dto/create-user.input.dto';
import {
    UpdateUserByAdminDto,
    UpdateUserDto,
} from '../dto/input.dto/update-user.input.dto';
import {
    UserOutputDto,
    UserOutputDtoByAdmin,
} from '../dto/output.dto/user.output.dto';
import { isUser } from '../middlewares/jwt.middleware';
import { UserService } from '../services/user.service';
import { promisifiedKave } from '../services/kavenegar.service';
import { SignupUserDto } from '../dto/input.dto/signup-user.input.dto';
import { LoginDto } from '../dto/input.dto/login-user.input.dto';
import { PaginationDto } from '../dto/input.dto/pagination.input.dto';

const userService = new UserService();

@JsonController()
export class UserController {
    @Post('/admin/users')
    @HttpCode(201)
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @ResponseSchema(UserOutputDto)
    @UseBefore(isUser)
    async createUser(
        @Body() body: CreateUserByAdminDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<Response<UserOutputDto>> {
        if (!user.admin) {
            throw new ForbiddenError('ONLY_ADMIN_ALLOWED');
        }

        const { password, ...userBody } = body;

        const createdUser = await userService.createUser(userBody);

        if (password)
            await userService.setPassword(
                createdUser._id.toString(),
                password,
            );

        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(createdUser),
        );
    }

    @Get('/users/:userId')
    @ResponseSchema(UserOutputDto)
    @UseBefore(isUser)
    async getUserById(
        @Param('userId') userId: string,
    ): Promise<Response<UserOutputDto>> {
        const user = await userService.getUserById(userId);

        if (!user) throw new NotFoundError('USER_NOT_FOUND');
        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(user),
        );
    }

    @Get('/admin/users')
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @ResponseSchema(UserOutputDto, { isArray: true })
    @UseBefore(isUser)
    async getUser(
        @CurrentUser() user: JwtPayload,
        @QueryParams() page: PaginationDto,
    ): Promise<Response<UserOutputDto[]>> {
        if (!user.admin) {
            throw new ForbiddenError('ONLY_ADMIN_ALLOWED');
        }

        const { users, count } = await userService.getUsers({}, page); // TODO: handle query options
        return new Response<UserOutputDto[]>(
            true,
            users.map((u) => UserModel.toDto(u)),
            {
                meta: {
                    page: page.page,
                    limit: page.limit,
                    count,
                },
            },
        );
    }

    @Get('/admin/users/:userId')
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(isUser)
    @ResponseSchema(UserOutputDtoByAdmin)
    async adminGetUserById(
        @Param('userId') userId: string,
    ): Promise<Response<UserOutputDtoByAdmin>> {
        const user = await userService.getUserById(userId);

        if (!user) throw new NotFoundError('USER_NOT_FOUND');

        return new Response<UserOutputDtoByAdmin>(
            true,
            new UserOutputDtoByAdmin(user),
        );
    }

    @Put('/users/:userId')
    @UseBefore(isUser)
    @ResponseSchema(UserOutputDto)
    async editUser(
        @Param('userId') userId: string,
        @Body() body: UpdateUserDto,
    ): Promise<Response<UserOutputDto>> {
        const user = await userService.updateUserById(userId, body);

        if (!user) {
            throw new NotFoundError('user_not_found'.toUpperCase());
        }

        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(user),
        );
    }

    @Put('/admin/users/:userId')
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @ResponseSchema(UserOutputDto)
    @UseBefore(isUser)
    async editUserByAdmin(
        @Param('userId') userId: string,
        @Body() body: UpdateUserByAdminDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<Response<UserOutputDto>> {
        if (!user.admin) {
            throw new ForbiddenError('ONLY_ADMIN_ALLOWED');
        }

        const updatedUser = await userService.updateUserById(
            userId,
            body,
        );

        if (!updatedUser) {
            throw new NotFoundError('user_not_found'.toUpperCase());
        }

        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(updatedUser),
        );
    }

    @Delete('/admin/users/:userId')
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @ResponseSchema(UserOutputDto)
    @UseBefore(isUser)
    async deleteUser(
        @Param('userId') userId: string,
        @CurrentUser() user: JwtPayload,
    ): Promise<Response<UserOutputDto>> {
        if (!user.admin) {
            throw new ForbiddenError('ONLY_ADMIN_ALLOWED');
        }

        const deletedUser = await userService.deleteUser(userId);

        if (!deletedUser) {
            throw new NotFoundError('USER_NOT_FOUND');
        }

        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(deletedUser),
        );
    }

    @Post('/users/signup')
    @OpenAPI({
        security: [{ bearerAuth: [] }],
    })
    @ResponseSchema(UserOutputDto)
    async signup(
        @Body() body: SignupUserDto,
    ): Promise<Response<UserOutputDto>> {
        const user = await userService.createUser(body);

        const verificationCode = String(
            Math.round(Math.random() * new Date().getTime() * 10_000),
        );

        await userService.updateUserById(String(user._id), {
            verificationCode: verificationCode,
        });

        await promisifiedKave({
            receptor: user.phoneNumber,
            token: verificationCode,
            template: 'verification',
        });

        return new Response<UserOutputDto>(
            true,
            UserModel.toDto(user),
        );
    }
}
