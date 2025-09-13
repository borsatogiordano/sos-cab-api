import z from "zod";

export const userSchemas = {
    createUser: {
        body: z.object({
            email: z.email("Email inválido"),
            password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
        })
    },

    getAllUsers: {
        querystring: z.object({
            page: z.coerce.number().optional(),
            perPage: z.coerce.number().optional(),
        })
    },

    changeEmail: {
        params: z.object({
            id: z.string("O ID do usuário é obrigatório")
        }),
        body: z.object({
            email: z.email("Email inválido")
        })
    },

    getUserById: {
        params: z.object({
            id: z.string("O ID do usuário é obrigatório")
        })
    }
};

export type CreateUserBody = z.infer<typeof userSchemas.createUser.body>;
export type ChangeEmailParams = z.infer<typeof userSchemas.changeEmail.params>;
export type ChangeEmailBody = z.infer<typeof userSchemas.changeEmail.body>;
export type GetAllUsersQuery = z.infer<typeof userSchemas.getAllUsers.querystring>;