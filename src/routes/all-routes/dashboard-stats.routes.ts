import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { makeExpenseFactory } from "../../factories/make-expense-factory";
import { makeStatsFactory } from "../../factories/make-stats-factory";

export async function statsRoutes(app: FastifyInstance) {

    const controller = makeStatsFactory();


    app.get("/stats",
        { onRequest: verifyJWT },
        controller.getDashboardStats
    )
}