import { ProfileRepository } from "../repositories/profile";
import { UserRepository } from "../repositories/user";
import { ProfileService } from "../services/profile";
import { ProfileController } from "../controllers/profile";

export function makeProfileFactory() {
    const profileRepository = new ProfileRepository();
    const userRepository = new UserRepository();
    const profileService = new ProfileService(profileRepository, userRepository);
    const profileController = new ProfileController(profileService);

    return profileController;
}