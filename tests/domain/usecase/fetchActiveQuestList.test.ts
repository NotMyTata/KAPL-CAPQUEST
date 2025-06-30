import { fetchActiveQuestListUseCase } from '@/domain/usecase/fetchActiveQuestListUseCase';

describe('fetchActiveQuestListUseCase', () => {
    let loggedInUserId = 123; // Example user ID
    let mockQuestRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            fetchActiveQuestList: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should return a list of active quests', async () => {
        const mockQuests = [
            { id: 1, name: 'Active Quest 1' },
            { id: 2, name: 'Active Quest 2' },
            { id: 3, name: 'Active Quest 3' }
        ];
        mockQuestRepository.fetchActiveQuestList.mockResolvedValue(mockQuests);

        const result = await fetchActiveQuestListUseCase(mockQuestRepository as any, loggedInUserId);

        expect(mockQuestRepository.fetchActiveQuestList).toHaveBeenCalledWith(loggedInUserId);
        expect(result).toEqual(mockQuests);
    });

    it('should return an empty array if there are no active quests', async () => { 
        mockQuestRepository.fetchActiveQuestList.mockResolvedValue([]);

        const result = await fetchActiveQuestListUseCase(mockQuestRepository as any, loggedInUserId);

        expect(result).toEqual([]);
    });

    it('should throw an error if repository throws', async () => {
        mockQuestRepository.fetchActiveQuestList.mockRejectedValue(new Error('DB error'));

        await expect(fetchActiveQuestListUseCase(mockQuestRepository as any, loggedInUserId)).rejects.toThrow('DB error');
    });
});