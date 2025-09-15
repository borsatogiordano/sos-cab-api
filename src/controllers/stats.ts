import { FastifyReply, FastifyRequest } from "fastify";
import { StatsService } from "../services/stats";

export class StatsController {
    constructor(private statsService: StatsService) { }

    getDashboardStats = async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user;
        const { startDate, endDate } = request.query as { startDate: string; endDate: string };

        const stats = await this.statsService.getDashboardStatsByDateRange(
            user.userId,
            startDate,
            endDate
        );
        reply.send(stats);
    }
}