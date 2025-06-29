import { questRepository } from "../repositories/questRepository";

export async function fetchActiveQuestListUseCase(questRepo: questRepository, freelancerId: number) {
    return await questRepo.fetchActiveQuestList(freelancerId);
}