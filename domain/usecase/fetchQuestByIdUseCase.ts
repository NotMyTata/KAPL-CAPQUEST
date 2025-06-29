import { questRepository } from "@/domain/repositories/questRepository";
import { Quest } from "../entities/quest";

export async function fetchQuestByIdUseCase(questRepo: questRepository, questId: number, loggedUserId: number): Promise<Quest | null> {
    const quest = await questRepo.findById(questId);
    if(!quest) return null;
    if(!quest.is_available && (loggedUserId !== quest.poster_id && loggedUserId !== quest.freelancer_id)) throw new Error("User is not allowed to view this quest");

    return quest;
}