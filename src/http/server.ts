import fastify from "fastify";
import { userRoutes } from "../routes/user.routes";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { globalErrorHandler } from "../errors/errorHandler";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(globalErrorHandler);

app.get("/health-check", async (request, reply) => {
    return { status: "OK" };
});

app.register(userRoutes)

app.listen({ port: 3000 }, (err, address) => {
    console.log(`Server listening at ${address}`);
});