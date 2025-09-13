import { RideController } from "../controllers/ride";
import { RideRepository } from "../repositories/ride";
import { UserRepository } from "../repositories/user";
import { RidesService } from "../services/rides";

export function makeRidesFactory() {
    const rideRepository = new RideRepository();
    const userRepository = new UserRepository();
    const rideService = new RidesService(userRepository, rideRepository);
    const rideController = new RideController(rideService);

    return rideController;
}