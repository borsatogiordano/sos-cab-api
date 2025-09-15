import { UserRepository } from "../repositories/user";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";
import { CreateRide, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";
import { RideRepository } from "../repositories/ride";
import { InvalidDateRangeError, InvalidDatesError, RidesDoesNotExistError } from "../errors/separated-errors/ride-errors";
import dayjs from "dayjs";
import { UnauthorizedError } from "../errors/separated-errors/authentication-errors";
import { FastifyJWT } from "@fastify/jwt";

export class RidesService {
    constructor(
        private userRepository: UserRepository,
        private rideRepository: RideRepository
    ) { }

    createRide = async (data: CreateRide, userId: string) => {
        const existingUser = await this.userRepository.getUserById(userId);

        if (!existingUser) {
            throw new UserNotFoundError();
        }

        return this.rideRepository.createRide(data, userId);
    }

    findRideById = async (rideId: string) => {
        const ride = await this.rideRepository.findRideById(rideId);

        if (!ride) {
            throw new RidesDoesNotExistError();
        }

        return ride;
    }

    findRidesByUserId = async (
        { userId }: FindRidesByUserIdParams,
        { page = 1, perPage = 10 }: FindRidesByUserIdQuery
    ) => {
        const existingUser = await this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new UserNotFoundError();
        }
        const pageTo = Number(page) || 1;
        const perPageTo = Number(perPage) || 10;
        return this.rideRepository.ridesByUserId({ userId }, { page: pageTo, perPage: perPageTo });
    }

    findRidesByDateRange = async (userId: string, startDate: Date, endDate: Date) => {
        const existingUser = await this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new UserNotFoundError();
        }
        if (!endDate || !startDate) {
            throw new InvalidDatesError();
        }

        const startDateDay = dayjs(startDate).startOf("day").toDate();
        const endDateDay = dayjs(endDate).endOf("day").toDate();

        if (!dayjs(startDateDay).isValid() || !dayjs(endDateDay).isValid()) {
            throw new InvalidDatesError();
        }

        if (endDateDay < startDateDay) {
            throw new InvalidDateRangeError();
        }

        return this.rideRepository.findRidesByDateRange(userId, startDateDay, endDateDay);
    }

    updateRide = async (rideId: string, user: FastifyJWT["user"], data: CreateRide) => {
        const existingRide = await this.rideRepository.findRideById(rideId);

        if (!existingRide) {
            throw new RidesDoesNotExistError();
        }

        const hasPermission = existingRide.userId === user.userId || user.role === 'ADMIN';

        if (!hasPermission) {
            throw new UnauthorizedError();
        }

        return this.rideRepository.updateRide(rideId, user.userId, data);
    }

    deleteRide = async (rideId: string, user: FastifyJWT["user"]) => {
        const existingRide = await this.rideRepository.findRideById(rideId);
        if (!existingRide) {
            throw new RidesDoesNotExistError();
        }
        const hasPermission = existingRide.userId === user.userId || user.role === 'ADMIN';

        if (!hasPermission) {
            throw new UnauthorizedError();
        }
        return this.rideRepository.deleteRide(rideId);
    }
}