import { QuestApplicant } from "../entities/questApplicant";
import { questRepository } from "../repositories/questRepository";

export async function fetchQuestApplicants(questRepo: questRepository, questId: number, loggedUserId: number) : Promise<QuestApplicant[]> {
    const quest = await questRepo.findById(questId);
    if (!quest) throw new Error("Quest not found");
    if (loggedUserId !== quest.poster_id) throw new Error("User is not allowed to view this quest applicants");

    // TODO: return their profile for the applicants
    return await questRepo.fetchQuestApplicants(questId);
}