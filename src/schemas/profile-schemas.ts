import z from "zod/v4";

export const profileSchemas = {
    createProfile: {
        body: z.object({
            firstName: z.string("O primeiro nome é obrigatório").min(2, "O primeiro nome deve conter no mínimo 2 caracteres"),
            lastName: z.string("O sobrenome é obrigatório").min(2, "O sobrenome deve conter no mínimo 2 caracteres"),
        })
    },

    updateProfile: {
        body: z.object({
            firstName: z.string().min(2, "O primeiro nome deve conter no mínimo 2 caracteres").optional(),
            lastName: z.string().min(2, "O sobrenome deve conter no mínimo 2 caracteres").optional(),
        })
    },
}

export type CreateProfile = z.infer<typeof profileSchemas.createProfile.body>;
export type UpdateProfile = z.infer<typeof profileSchemas.updateProfile.body>;