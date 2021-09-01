import { UserModel, User, UserRoles } from '../models/user.model';
import { BaseRepository } from './base-repository.service';
import {
    BadRequestError,
    NotFoundError,
    HttpError,
} from 'routing-controllers';
import { FilterQuery, UpdateQuery } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { jwtConfigs } from '../commons/constants/jwt.constant';
import { PaginationDto } from '../dto/input.dto/pagination.input.dto';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(UserModel);
    }
}

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async isPhoneNumberTaken(phoneNumber: string) {
        const user = await this.userRepository.findOne({
            phoneNumber,
        });

        if (user) return true;
        else return false;
    }

    async createUser(
        userBody: DeepPartial<User>,
    ): Promise<User> | never {
        if (!userBody.phoneNumber) {
            throw new BadRequestError('PHONE_NUMBER_MISSING');
        }

        const fetchedUserByPhoneNumber =
            await this.userRepository.findOne({
                phoneNumber: userBody.phoneNumber,
            });

        if (fetchedUserByPhoneNumber) {
            throw new HttpError(
                409,
                'phoneNumber_already_taken'.toUpperCase(),
            );
        }

        const fetchedUserByUserName =
            await this.userRepository.findOne({
                username: userBody.username,
            });

        if (fetchedUserByUserName) {
            throw new HttpError(
                400,
                'userName_already_taken'.toUpperCase(),
            );
        }

        return this.userRepository.create(userBody);
    }

    async getUserById(userId: string): Promise<User | null> | never {
        return await this.userRepository.findById(userId);
    }

    async getUserByPhoneNumber(
        phoneNumber: string,
    ): Promise<User | null> | never {
        return await this.userRepository.findOne({
            phoneNumber,
        });
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findOne({
            username: username,
        });

        if (!user) throw new NotFoundError('USER_NOT_FOUND');

        return user;
    }

    findOne(query: FilterQuery<User>): Promise<User | null> | never {
        return this.userRepository.findOne(query);
    }

    async getUsers(
        query: FilterQuery<User>,
        page: PaginationDto,
    ): Promise<{ users: User[]; count: number }> | never {
        const users = await this.userRepository.find(
            query,
            undefined,
            { [page.sortBaseOn]: page.sort },
            {
                skip: (page.page - 1) * page.limit,
                limit: page.limit,
            },
        );
        const count = await this.userRepository.countDocuments(query);

        return { users, count };
    }

    async deleteUser(userId: string): Promise<User | null> {
        const user = await this.userRepository.delete(userId);

        await this.userRepository.delete(userId);
        return user;
    }

    async updateUserById(
        userId: string,
        updateBody: UpdateQuery<User>,
    ): Promise<User | null> | never {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            return user;
        }

        const updatedUser = await this.userRepository.update(
            userId,
            updateBody,
        );

        return updatedUser;
    }

    async validatePassword(
        userId: string,
        password: string,
    ): Promise<boolean> {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundError('USER_NOT_FOUND');
        const hash = await crypto
            .pbkdf2Sync(
                password,
                user.password.salt,
                10000,
                512,
                'sha512',
            )
            .toString('hex');
        return user.password.hash === hash;
    }

    async setPassword(userId: string, password: string) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto
            .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
            .toString('hex');

        await this.updateUserById(userId, {
            password: {
                salt: salt,
                hash: hash,
            },
        });
    }

    async generateToken(userId: string): Promise<string> {
        const user = await this.getUserById(userId);

        if (!user) throw new NotFoundError('USER_NOT_FOUND');

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                admin: user.role === UserRoles.ADMIN && true,
                contractor:
                    user.role === UserRoles.CONTRACTOR && true,
                id: user._id,
                exp: parseInt(
                    String(expirationDate.getTime() / 1000),
                    10,
                ),
            },
            jwtConfigs.jwtSecret,
        );
    }
}
