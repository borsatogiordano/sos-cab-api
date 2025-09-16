import dayjs from "dayjs";
import { StatsRepository } from "../repositories/stats";

interface StatItem {
    value: number;
    percentage: number;
    trend: number;
}

interface DashboardStats {
    netProfit: StatItem;
    totalEarnings: StatItem;
    totalExpenses: StatItem;
    totalRides: StatItem;
    period: {
        start: string;
        end: string;
        type: string;
    };
}

export class StatsService {
    constructor(private statsRepository: StatsRepository) { }

    async getDashboardStatsByDateRange(userId: string, startDate: string, endDate: string): Promise<DashboardStats> {

        const startDateDay = dayjs(startDate).startOf("day").toDate();
        const endDateDay = dayjs(endDate).endOf("day").toDate();
        const [totalEarningsAgg, totalExpensesAgg, totalRides] = await Promise.all([
            this.statsRepository.getEarningsByDateRange(userId, startDateDay, endDateDay),
            this.statsRepository.getExpensesByDateRange(userId, startDateDay, endDateDay),
            this.statsRepository.getRidesCountByDateRange(userId, startDateDay, endDateDay)
        ]);

        const totalEarnings = Number(totalEarningsAgg._sum.price) || 0;
        const totalExpenses = Math.abs(Number(totalExpensesAgg._sum.amount)) || 0;  // Converte para positivo
        const netProfit = totalEarnings - totalExpenses;  // Subtrai o valor absoluto

        const periodDuration = dayjs(endDateDay).diff(dayjs(startDateDay), 'millisecond');
        const prevEndDate = dayjs(startDateDay).subtract(1, 'millisecond').toDate();
        const prevStartDate = dayjs(prevEndDate).subtract(periodDuration, 'millisecond').toDate();

        const [prevEarningsAgg, prevExpensesAgg, prevRides] = await Promise.all([
            this.statsRepository.getEarningsByDateRange(userId, prevStartDate, prevEndDate),
            this.statsRepository.getExpensesByDateRange(userId, prevStartDate, prevEndDate),
            this.statsRepository.getRidesCountByDateRange(userId, prevStartDate, prevEndDate)
        ]);

        const prevEarnings = Number(prevEarningsAgg._sum.price || 0);
        const prevExpenses = Math.abs(Number(prevExpensesAgg._sum.amount || 0));
        const prevNetProfit = prevEarnings - prevExpenses;

        const calculateStat = (current: number, previous: number): StatItem => {
            const percentage = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
            const trend = current > previous ? 1 : current < previous ? -1 : 0;
            return { value: current, percentage: Math.round(percentage * 100) / 100, trend };
        };

        return {
            netProfit: calculateStat(netProfit, prevNetProfit),
            totalEarnings: calculateStat(totalEarnings, prevEarnings),
            totalExpenses: calculateStat(totalExpenses, prevExpenses),
            totalRides: calculateStat(totalRides, prevRides),
            period: {
                start: dayjs(startDate).format('YYYY-MM-DD'),
                end: dayjs(endDate).format('YYYY-MM-DD'),
                type: "custom"
            }
        };
    }
}