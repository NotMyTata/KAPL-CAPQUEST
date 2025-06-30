import { questRepository } from "@/domain/repository/questRepository";

export async function applyToQuestUseCase(questRepo: questRepository, questId: number, freelancerId: number) {
    let existingQuest;
    try {
        existingQuest = await questRepo.findById(questId);
    } catch (error) {
        throw error;
    }
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.poster.id === freelancerId) throw new Error("Quest poster cannot apply for their own quest");
    if (!existingQuest.is_available) throw new Error("Quest is not available");
    if (existingQuest.is_finished) throw new Error("Quest is already finished");
    if (existingQuest.freelancer) throw new Error("Freelancer already exists");

    let existingQuestApplicant;
    try {
        existingQuestApplicant = await questRepo.fetchQuestApplicant(questId, freelancerId);
    } catch (error) {
        throw error;
    }
    if (existingQuestApplicant) throw new Error("User already applied");

    return await questRepo.apply(questId, freelancerId);
}