import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { globalErrorHandler } from "../errors/errorHandler";
import { env } from "process";
import fastifyJwt from "@fastify/jwt";
import { routes } from "../routes";
import fastifyCors from "@fastify/cors";

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

app.register(fastifyCors, {
    origin: true,
});

app.get("/api/health-check", async (request, reply) => {
    return { status: "OK" };
});

app.register(routes);

app.listen({ port: 3333 }, (err, port) => {
    console.log(`Server listening at ${port}`);
});

let animal: string[] = ['cat', 'dog', 'elephant'];