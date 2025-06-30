import { questRepository } from "@/domain/repository/questRepository";

export async function fetchMyQuestListUseCase(questRepo: questRepository, posterId: number) {
    return await questRepo.fetchMyQuestList(posterId);
}