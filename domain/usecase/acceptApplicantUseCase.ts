import { questRepository } from "@/domain/repositories/questRepository";

export async function acceptApplicantUseCase(questRepo: questRepository, questId: number, posterId: number, freelancerId: number) {
    const existingQuest = await questRepo.findById(questId);
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.poster.id !== posterId) throw new Error("Only quest poster can accept applicant");
    if (existingQuest.poster.id === freelancerId) throw new Error("Quest poster cannot accept themself");
    if (!existingQuest.is_available) throw new Error("Quest is not available");
    if (existingQuest.is_finished) throw new Error("Quest is already finished");
    if (existingQuest.freelancer) throw new Error("Freelancer already exist");

    const existingQuestApplicant = await questRepo.fetchQuestApplicant(questId, freelancerId);
    if (!existingQuestApplicant) throw new Error("Freelancer hasn't applied yet");
    
    return await questRepo.accept(questId, freelancerId);
}