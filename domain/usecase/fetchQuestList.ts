import { questRepository } from "../repositories/questRepository";

export async function fetchQuestListUseCase(questRepo: questRepository) {
    return await questRepo.fetchQuestList();
}