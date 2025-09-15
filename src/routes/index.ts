import { FastifyInstance } from "fastify";
import { userRoutes } from "./all-routes/user.routes";
import { authRoutes } from "./all-routes/auth.routes";
import { profileRoutes } from "./all-routes/profile.routes";
import { rideRoutes } from "./all-routes/ride.routes";
import { expenseRoutes } from "./all-routes/expense.routes";
import { statsRoutes } from "./all-routes/dashboard-stats.routes";

export async function routes(app: FastifyInstance) {
    await app.register(userRoutes, { prefix: "/api" });
    await app.register(authRoutes, { prefix: "/api" });
    await app.register(profileRoutes, { prefix: "/api" });
    await app.register(rideRoutes, { prefix: "/api" });
    await app.register(expenseRoutes, { prefix: "/api" });
    await app.register(statsRoutes, { prefix: "/api" });
}