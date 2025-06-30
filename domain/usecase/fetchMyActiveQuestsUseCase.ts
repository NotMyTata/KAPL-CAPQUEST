import { Quest } from "@/domain/entity/quest";
import { questRepository } from "@/domain/repository/questRepository";

export async function fetchMyActiveQuestsUseCase(questRepo: questRepository, freelancerId: number): Promise<Quest[]> {
    return await questRepo.fetchActiveQuestsByUserId(freelancerId);
}