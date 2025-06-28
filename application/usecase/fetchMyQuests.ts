export default class fetchMyQuests {
    constructor(private readonly questRepository: IQuestRepository){}

    async execute(posterId: number): Promise<Quest[]> {
        return await this.questRepository.fetchQuestsByUserId(posterId);
    }
}