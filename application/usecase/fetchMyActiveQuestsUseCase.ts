import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export default class fetchMyActiveQuestsUseCase {
    constructor(private readonly questRepository: questRepository){}

    async execute(freelancerId: number): Promise<Quest[]> {
        return await this.questRepository.fetchActiveQuestsByUserId(freelancerId);
    }
}