import { questRepository } from "@/domain/repository/questRepository";
import { Quest } from "@/domain/entity/quest";

export async function fetchQuestByIdUseCase(questRepo: questRepository, questId: number, loggedUserId: number): Promise<Quest | null> {
    const quest = await questRepo.findById(questId);
    
    if(!quest) throw new Error("Quest not found");
    if(!quest.is_available && (loggedUserId !== quest.poster.id && (quest.freelancer && loggedUserId !== quest.freelancer.id))) throw new Error("User is not allowed to view this quest");

    return quest;
}