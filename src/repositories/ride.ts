import { prisma } from "../lib/prisma";
import { CreateRide, FindRidesByUserIdParams, FindRidesByUserIdQuery } from "../schemas/ride-schema";

export class RideRepository {
    async createRide(data: CreateRide, userId: string) {
        return prisma.ride.create({ data: { ...data, userId } });
    }

    async findRideById(rideId: string) {
        return prisma.ride.findUnique({ where: { id: rideId } });
    }

    async ridesByUserId(
        { userId }: FindRidesByUserIdParams,
        { page = 1, perPage = 10 }: FindRidesByUserIdQuery
    ) {

        const skip = (page - 1) * perPage;


        const [data, total] = await Promise.all([
            prisma.ride.findMany({
                where: { userId },
                skip,
                take: perPage
            }),
            prisma.ride.count({ where: { userId } })
        ]);

        return {
            data,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        };
    }

    async findRidesByDateRange(userId: string, startDate: Date, endDate: Date) {
        const data = prisma.ride.findMany({
            where: {
                userId,
                rideDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
        return data;
    }

    async updateRide(rideId: string, userId: string, data: CreateRide) {
        return prisma.ride.update({
            where: {
                id: rideId,
                userId
            },
            data
        });


    }
    async deleteRide(rideId: string) {
        const ride = await prisma.ride.delete({
            where: {
                id: rideId,
            }
        })
    }
}