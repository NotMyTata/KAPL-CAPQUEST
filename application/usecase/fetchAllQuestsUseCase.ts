export default class fetchAllQuestsUseCase {
    constructor(private readonly questRepository: IQuestRepository){}

    async execute(): Promise<Quest[]> {
        return await this.questRepository.fetchAllQuests();
    }
}