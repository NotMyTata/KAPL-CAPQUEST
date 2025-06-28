import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export default class fetchMyQuests {
    constructor(private readonly questRepository: questRepository){}

    async execute(posterId: number): Promise<Quest[]> {
        return await this.questRepository.fetchQuestsByUserId(posterId);
    }
}