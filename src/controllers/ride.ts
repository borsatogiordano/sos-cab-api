import { FastifyReply, FastifyRequest } from "fastify";
import { RidesService } from "../services/rides";
import { CreateRide, FindRideByDateRangeQuery, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";

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

    findRidesByDateRange = async (request: FastifyRequest, reply: FastifyReply) => {
        const { startDate, endDate } = request.query as FindRideByDateRangeQuery;
        const { userId } = request.user;

        const rides = await this.rideService.findRidesByDateRange(userId, new Date(startDate), new Date(endDate));
        reply.send(rides);
    }

    updateRide = async (request: FastifyRequest, reply: FastifyReply) => {
        const { rideId } = request.params as { rideId: string };
        const body = request.body as CreateRide;
        const user = request.user;

        await this.rideService.updateRide(rideId, user, body);
        reply.code(200).send();
    }

    deleteRide = async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user;
        const { rideId } = request.params as { rideId: string };

        await this.rideService.deleteRide(rideId, user);
        reply.code(204).send();
    }
}