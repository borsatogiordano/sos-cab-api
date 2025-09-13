import { FastifyInstance } from "fastify";
import { profileSchemas } from "../schemas/profile-schemas";
import { makeProfileFactory } from "../factories/make-profile-factory";
import { verify } from "crypto";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function profileRoutes(app: FastifyInstance) {
    const controller = makeProfileFactory();

    app.post("/create-profile", {
        onRequest: verifyJWT,
        schema: profileSchemas.createProfile
    }, controller.createProfile);

    app.put("/update-profile/:userId", {
        onRequest: verifyJWT,
        schema: profileSchemas.updateProfile
    }, controller.updateProfile);
}