import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export async function fetchAllQuestsUseCase(questRepo: questRepository): Promise<Quest[]> {
    return await questRepo.fetchAllQuests();
}
