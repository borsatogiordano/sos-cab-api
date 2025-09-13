import { Prisma } from "@prisma/client";
import { UserRepository } from "../repositories/user";
import bcrypt from "bcryptjs";
import { InvalidUserCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "../errors/separated-errors/user-errors";
import { ForbiddenError } from "../errors/separated-errors/authentication-errors";
import { CreateUserBody } from "../schemas/user-schemas";

export class UserService {
    constructor(private userRepo: UserRepository) { }

    async createUser({ email, password }: CreateUserBody) {
        const alreadyExists = await this.userRepo.getUserByEmail(email);
        if (alreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const hashedPassword = await bcrypt.hash(password, 6);
        const user = await this.userRepo.createUser({ email, password: hashedPassword });

        return user;
    }

    async getAllUsers(page: number = 1, perPage: number = 10) {
        if (page < 1) page = 1;
        if (perPage < 1 || perPage > 100) perPage = 10;

        return await this.userRepo.getAllUsers(page, perPage);
    }

    async getUserById(id: string) {
        const user = await this.userRepo.getUserById(id);
        if (!user) return null;
        return user;
    }

    async changeEmail(id: string, email: string, loggedUserId: string, loggedUserRole: string) {

        const userToUpdate = await this.userRepo.getUserById(id);
        if (!userToUpdate) {
            throw new UserNotFoundError();
        }

        const existingUser = await this.userRepo.getUserByEmail(email);
        if (existingUser && existingUser.id !== id) {
            throw new UserAlreadyExistsError();
        }

        if (loggedUserRole !== 'ADMIN' && loggedUserId !== id) {
            throw new ForbiddenError();
        }

        return await this.userRepo.changeEmail(id, email);
    }


    async deleteUser(loggedUserId: string, loggedUserRole: string, userIdToDelete: string) {
        const userToDelete = await this.userRepo.getUserById(userIdToDelete);
        if (!userToDelete) {
            throw new UserNotFoundError();
        }

        if (loggedUserRole !== 'ADMIN' && loggedUserId !== userIdToDelete) {
            throw new ForbiddenError();
        }

        return await this.userRepo.deleteUser(userIdToDelete);
    }

    async login({ email, password }: { email: string; password: string }) {
        const user = await this.userRepo.getUserByEmail(email);
        if (!user) {
            throw new InvalidUserCredentialsError();
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new InvalidUserCredentialsError();
        }

        return user;
    }
}
