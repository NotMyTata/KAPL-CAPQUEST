export default class addQuestUseCase {
    constructor(private readonly questRepository: IQuestRepository){}

    async execute(data: Quest): Promise<void> {
        await this.questRepository.add(data);
    }
}