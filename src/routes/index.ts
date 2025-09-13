import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

export async function routes(app: FastifyInstance) {
    await app.register(userRoutes, { prefix: "/api" });
    await app.register(authRoutes, { prefix: "/api" });
}