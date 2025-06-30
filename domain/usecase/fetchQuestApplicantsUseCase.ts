import { QuestApplicant } from "@/domain/entity/questApplicant";
import { questRepository } from "@/domain/repository/questRepository";

export async function fetchQuestApplicantsUseCase(questRepo: questRepository, questId: number, loggedUserId: number) : Promise<QuestApplicant[]> {
    const quest = await questRepo.findById(questId);
    if (!quest) throw new Error("Quest not found");
    if (loggedUserId !== quest.poster.id) throw new Error("User is not allowed to view this quest applicants");

    return await questRepo.fetchQuestApplicants(questId);
}