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
            error: error.name || 'Error',
            message: error.message
        });
    }

    console.error(error);
    return reply.code(500).send({
        error: "InternalServerError",
        message: "Erro interno do servidor"
    });
}