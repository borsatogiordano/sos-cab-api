import { FastifyReply, FastifyRequest } from "fastify";
import { RidesService } from "../services/rides";
import { CreateRide } from "../schemas/ride-schema";

export class RideController {
    constructor(private rideService: RidesService) { }

    createRide = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateRide;
        const userId = request.user.userId;
        await this.rideService.createRide(body, userId);
        reply.code(201).send();
    };
}