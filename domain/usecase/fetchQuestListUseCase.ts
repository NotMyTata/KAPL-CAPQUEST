import { questRepository } from "@/domain/repository/questRepository";

export async function fetchQuestListUseCase(questRepo: questRepository) {
    return await questRepo.fetchQuestList();
}