import fastify from "fastify";
import { userRoutes } from "../routes/user.routes";

const app = fastify();

app.get("/health-check", async (request, reply) => {
    return { status: "OK" };
});

app.register(userRoutes)

app.listen({ port: 3000 }, (err, address) => {
    console.log(`Server listening at ${address}`);
});