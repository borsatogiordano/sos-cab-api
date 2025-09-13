import { ProfileRepository } from "../repositories/profile";
import { UserRepository } from "../repositories/user";
import { CreateProfile, UpdateProfile } from "../schemas/profile-schemas";
import { UserNotFoundError } from "../errors/separated-errors/user-errors";
import { ProfileAlreadyExistsError } from "../errors/separated-errors/profile-errors";
import { ForbiddenError } from "../errors/separated-errors/authentication-errors";

export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository,
        private userRepository: UserRepository
    ) { }

    createProfile = async (data: CreateProfile, userId: string) => {
        const existingUser = await this.userRepository.getUserById(userId);

        if (!existingUser) {
            throw new UserNotFoundError();
        }

        if (existingUser.profile) {
            throw new ProfileAlreadyExistsError();
        }

        return this.profileRepository.createProfile(data, userId);
    }

    updateProfile = async (targetUserId: string, loggedUserId: string, userRole: string, data: UpdateProfile) => {

        console.log({ targetUserId, loggedUserId, userRole, data });
        const targetUser = await this.userRepository.getUserById(targetUserId);

        if (!targetUser) {
            throw new UserNotFoundError();
        }

        const canUpdate = targetUserId === loggedUserId || userRole === 'ADMIN';
        if (!canUpdate) {
            throw new ForbiddenError();
        }

        return this.profileRepository.updateProfile(targetUserId, data);
    }
}