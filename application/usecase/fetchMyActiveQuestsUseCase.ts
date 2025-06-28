export default class fetchMyActiveQuestsUseCase {
    constructor(private readonly questRepository: IQuestRepository){}

    async execute(freelancerId: number): Promise<Quest[]> {
        return await this.questRepository.fetchActiveQuestsByUserId(freelancerId);
    }
}