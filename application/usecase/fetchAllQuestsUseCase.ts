import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export default class fetchAllQuestsUseCase {
    constructor(private readonly questRepository: questRepository){}

    async execute(): Promise<Quest[]> {
        return await this.questRepository.fetchAllQuests();
    }
}