import { questRepository } from "@/domain/repository/questRepository";

export async function acceptApplicantUseCase(questRepo: questRepository, questId: number, posterId: number, freelancerId: number) {
    let existingQuest;
    try {
        existingQuest = await questRepo.findById(questId);
    } catch (error) {
        throw error;
    }
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.poster.id !== posterId) throw new Error("Only quest poster can accept applicant");
    if (existingQuest.poster.id === freelancerId) throw new Error("Quest poster cannot accept themself");
    if (!existingQuest.is_available) throw new Error("Quest is not available");
    if (existingQuest.is_finished) throw new Error("Quest is already finished");
    if (existingQuest.freelancer) throw new Error("Freelancer already exist");

    let existingQuestApplicant;
    try {
        existingQuestApplicant = await questRepo.fetchQuestApplicant(questId, freelancerId);
    } catch (error) {
        throw error;
    }
    if (!existingQuestApplicant) throw new Error("Freelancer hasn't applied yet");
    
    return await questRepo.accept(questId, freelancerId);
}