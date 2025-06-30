import { Quest } from "@/domain/entity/quest";
import { questRepository } from "@/domain/repository/questRepository";

export async function fetchMyQuests(questRepo: questRepository, posterId: number) : Promise<Quest[]> {
    return await questRepo.fetchQuestsByUserId(posterId);
}