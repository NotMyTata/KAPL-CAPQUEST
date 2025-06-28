import { questRepository } from "@/domain/repositories/questRepository";

export async function fetchQuestByIdUseCase(questRepo: questRepository, questId: number) {
    return await questRepo.findById(questId);
}