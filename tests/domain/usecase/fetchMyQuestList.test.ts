import { fetchActiveQuestListUseCase } from '@/domain/usecase/fetchActiveQuestListUseCase';
import { fetchMyQuestListUseCase } from '@/domain/usecase/fetchMyQuestListUseCase';

describe('fetchMyQuestListUseCase', () => {
    let loggedInUserId = 123; // Example user ID
    let mockQuestRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            fetchMyQuestList: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should return a list of my quests', async () => {
        const mockQuests = [
            { id: 1, name: 'My Quest 1' },
            { id: 2, name: 'My Quest 2' },
            { id: 3, name: 'My Quest 3' }
        ];
        mockQuestRepository.fetchMyQuestList.mockResolvedValue(mockQuests);

        const result = await fetchMyQuestListUseCase(mockQuestRepository as any, loggedInUserId);

        expect(mockQuestRepository.fetchMyQuestList).toHaveBeenCalledWith(loggedInUserId);
        expect(result).toEqual(mockQuests);
    });

    it('should return an empty array if there are no my quests', async () => { 
        mockQuestRepository.fetchMyQuestList.mockResolvedValue([]);

        const result = await fetchMyQuestListUseCase(mockQuestRepository as any, loggedInUserId);

        expect(result).toEqual([]);
    });

    it('should throw an error if repository throws', async () => {
        mockQuestRepository.fetchMyQuestList.mockRejectedValue(new Error('DB error'));

        await expect(fetchMyQuestListUseCase(mockQuestRepository as any, loggedInUserId)).rejects.toThrow('DB error');
    });
});