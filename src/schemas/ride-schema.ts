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
    }
};

export type CreateRide = z.infer<typeof rideSchemas.createRide.body>; 