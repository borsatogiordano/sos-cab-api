import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/separated-errors/authentication-errors";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        throw new UnauthorizedError();
    }
}


// export function verifyJWTAndRole(allowedRoles: string[]) {
//     return async (request: FastifyRequest, reply: FastifyReply) => {
//         try {
//             await request.jwtVerify();
            
//             // Depois verifica a role
//             const userRole = request.user.role;
            
//             if (!userRole || !allowedRoles.includes(userRole)) {
//                 throw new 
//             }
//         } catch (err) {
//             reply.code(401).send({ error: "Você não está autenticado" });
//         }
//     };
// }