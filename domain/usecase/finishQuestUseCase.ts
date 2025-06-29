import { questRepository } from "@/domain/repositories/questRepository";

export async function finishQuestUseCase(questRepo: questRepository, questId: number, posterId: number) {
    const quest = await questRepo.findById(questId);
    if (!quest) throw new Error("Quest not found");
    if (quest.poster.id !== posterId) throw new Error("Only quest poster can finish quest");
    if (quest.is_available) throw new Error("Quest is still available");
    if (quest.is_finished) throw new Error("Quest is already finished");
    if (!quest.freelancer) throw new Error("Freelancer doesn't exist");

    return await questRepo.finish(questId);
}