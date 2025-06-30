import { Quest } from "@/domain/entity/quest";
import { questRepository } from "@/domain/repository/questRepository";

export async function fetchAllQuestsUseCase(questRepo: questRepository): Promise<Quest[]> {
    return await questRepo.fetchAllQuests();
}
