import { z } from "zod";

export const PaymentMethodEnum = z.enum(["CARD", "CASH", "PIX"]);

export const rideSchemas = {
    createRide: {
        body: z.object({
            startAddress: z.string().min(1),
            endAddress: z.string().min(1),
            distance: z.preprocess(
                (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : val),
                z.number().positive()
            ),
            price: z.preprocess(
                (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : val),
                z.number().positive()
            ),
            paymentMethod: PaymentMethodEnum,
            observations: z.string().optional(),
        })
    },
    findRidesByUserId: {
        querystring: z.object({
            page: z.coerce.number().optional(),
            perPage: z.coerce.number().optional(),
        }),
        params: z.object({
            userId: z.string()
        })
    },
};

export type CreateRide = z.infer<typeof rideSchemas.createRide.body>;
export type FindRidesByUserIdParams = z.infer<typeof rideSchemas.findRidesByUserId.params>;
export type FindRidesByUserIdQuery = z.infer<typeof rideSchemas.findRidesByUserId.querystring>;