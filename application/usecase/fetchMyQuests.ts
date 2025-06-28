import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export async function fetchMyQuests(questRepo: questRepository, posterId: number) : Promise<Quest[]> {
    return await questRepo.fetchQuestsByUserId(posterId);
}