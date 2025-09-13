import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProfile, UpdateProfile } from "../schemas/profile-schemas";
import { ProfileService } from "../services/profile";

export class ProfileController {
    constructor(private profileService: ProfileService) { }

    createProfile = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProfile;
        const userId = request.user.userId;
        await this.profileService.createProfile(body, userId);
        reply.code(201).send();
    };

    updateProfile = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpdateProfile;
        const loggedUser = request.user;
        const { userId } = request.params as { userId: string };
        
        const updatedProfile = await this.profileService.updateProfile(
            userId,
            loggedUser.userId,
            loggedUser.role,
            body
        );
        reply.send(updatedProfile);
    }
}