import { questRepository } from "@/domain/repositories/questRepository";

export async function applyToQuestUseCase(questRepo: questRepository, questId: number, freelancerId: number) {
    const existingQuest = await questRepo.findById(questId);
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.poster.id === freelancerId) throw new Error("Quest poster cannot apply for their own quest");
    if (!existingQuest.is_available) throw new Error("Quest is not available");
    if (existingQuest.is_finished) throw new Error("Quest is already finished");
    if (existingQuest.freelancer) throw new Error("Freelancer already exists");

    const existingQuestApplicant = await questRepo.fetchQuestApplicant(questId, freelancerId);
    if (existingQuestApplicant) throw new Error("User already applied");

    return await questRepo.apply(questId, freelancerId);
}