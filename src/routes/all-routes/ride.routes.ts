import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { makeRidesFactory } from "../../factories/make-rides-factory";
import { rideSchemas } from "../../schemas/ride-schema";

export async function rideRoutes(app: FastifyInstance) {

    const controller = makeRidesFactory();

    app.post("/create-ride", {
        onRequest: verifyJWT,
        schema: rideSchemas.createRide
    }, controller.createRide);
}