import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { globalErrorHandler } from "../errors/errorHandler";
import { env } from "process";
import fastifyJwt from "@fastify/jwt";
import { routes } from "../routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(globalErrorHandler);

app.register(fastifyJwt, {
    secret: env.ACCESS_TOKEN_SECRET as string,
    sign: {
        expiresIn: '15m'
    }
});

app.get("/health-check", async (request, reply) => {
    return { status: "OK" };
});

app.register(routes);
app.listen({ port: 3000 }, (err, address) => {
    console.log(`Server listening at ${address}`);
});
