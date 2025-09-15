import { prisma } from "../lib/prisma";

export class StatsRepository {
    async getEarningsByDateRange(userId: string, startDate: Date, endDate: Date) {
        return prisma.ride.aggregate({
            where: { userId, rideDate: { gte: startDate, lte: endDate } },
            _sum: { price: true }
        });
    }

    async getExpensesByDateRange(userId: string, startDate: Date, endDate: Date) {
        return prisma.expense.aggregate({
            where: { userId, date: { gte: startDate, lte: endDate } },
            _sum: { amount: true } 
        });
    }

    async getRidesCountByDateRange(userId: string, startDate: Date, endDate: Date) {
        return prisma.ride.count({
            where: { userId, rideDate: { gte: startDate, lte: endDate } }
        });
    }
}