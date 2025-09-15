import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { makeRidesFactory } from "../../factories/make-rides-factory";
import { rideSchemas } from "../../schemas/ride-schema";
import z from "zod";

export async function rideRoutes(app: FastifyInstance) {

    const controller = makeRidesFactory();

    app.post("/rides", {
        onRequest: verifyJWT,
        schema: rideSchemas.createRide
    }, controller.createRide);

    app.get("/rides/:rideId", {
        onRequest: verifyJWT,
        schema: {
            params: z.object({
                rideId: z.string()
            })
        }
    }, controller.findRideById);

    app.get("/rides/me", {
        onRequest: verifyJWT,
        schema: rideSchemas.findRidesByUserId.querystring
    }, controller.findMyRides);

    app.get("/rides/me/date-range", {
        onRequest: verifyJWT,
        schema: rideSchemas.findRideByDateRange.querystring
    }, controller.findRidesByDateRange);

    app.put("/rides/:rideId", {
        onRequest: verifyJWT,
        schema: rideSchemas.createRide.body
    }, controller.updateRide)

    app.delete("/rides/:rideId", {
        onRequest: verifyJWT,
        schema: {
            params: z.object({
                rideId: z.string()
            })
        }
    }, controller.deleteRide);
}