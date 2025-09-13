import { UserRepository } from "../repositories/user";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";
import { CreateRide, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";
import { RideRepository } from "../repositories/ride";
import { RidesDoesNotExistError } from "../errors/separated-errors/ride-errors";

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
        return this.rideRepository.ridesByUserId({ userId }, { page, perPage });
    }
}