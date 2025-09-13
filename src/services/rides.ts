import { UserRepository } from "../repositories/user";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";
import { CreateRide } from "../schemas/ride-schema";
import { RideRepository } from "../repositories/ride";

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
}