import { StatsController } from "../controllers/stats";
import { StatsRepository } from "../repositories/stats";
import { StatsService } from "../services/stats";

export function makeStatsFactory() {
    const statsRepository = new StatsRepository();
    const statsService = new StatsService(statsRepository);
    const statsController = new StatsController(statsService);

    return statsController;
}