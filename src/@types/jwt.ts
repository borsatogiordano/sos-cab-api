

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            userId: string;
            role: string;
        }
    }
}