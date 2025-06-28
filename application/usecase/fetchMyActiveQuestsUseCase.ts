import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export async function fetchMyActiveQuestsUseCase(questRepo: questRepository, freelancerId: number): Promise<Quest[]> {
    return await questRepo.fetchActiveQuestsByUserId(freelancerId);
}