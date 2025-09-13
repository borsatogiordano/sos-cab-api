import { FastifyReply, FastifyRequest } from "fastify";
import { RidesService } from "../services/rides";
import { CreateRide, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";

export class RideController {
    constructor(private rideService: RidesService) { }

    createRide = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateRide;
        const userId = request.user.userId;
        await this.rideService.createRide(body, userId);
        reply.code(201).send();
    };

    findRideById = async (request: FastifyRequest, reply: FastifyReply) => {
        const { rideId } = request.params as { rideId: string };
        const ride = await this.rideService.findRideById(rideId);
        reply.send(ride);
    }

    findMyRides = async (request: FastifyRequest, reply: FastifyReply) => {
        const { page = 1, perPage = 10 } = request.query as FindRidesByUserIdQuery;
        const { userId } = request.user;

        const rides = await this.rideService.findRidesByUserId({ userId }, { page, perPage });
        reply.send(rides);
    }
}