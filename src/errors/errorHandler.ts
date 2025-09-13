import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export interface AppError extends Error {
    statusCode: number;
}

export async function globalErrorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    if ('statusCode' in error && typeof error.statusCode === 'number') {
        return reply.code(error.statusCode).send({
            message: error.message
        });
    }

    console.error(error);
    return reply.code(500).send({
        message: "Erro interno do servidor"
    });
}