import { addQuestUseCase } from '@/domain/usecase/addQuestUseCase';

describe('addQuestUseCase', () => {
    let mockQuestRepository: any;
    let mockRoleRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            add: jest.fn(),
        };
        mockRoleRepository = {
            findById: jest.fn().mockReturnValue([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]),
        };
        jest.clearAllMocks();
    });

    it('should add a quest with valid data', async () => {
        const questData = { 
            name: 'New Test Quest', 
            description: 'Test quest',
            difficulty: 'A',
            roleIds: [1, 5],
            poster_id: 4
        };
        mockQuestRepository.add.mockResolvedValue({ id: 1, ...questData });

        const result = await addQuestUseCase(mockQuestRepository as any, mockRoleRepository as any, questData as any);

        expect(mockQuestRepository.add).toHaveBeenCalledWith(questData);
        expect(result).toEqual({ id: 1, ...questData });
    });

    it('should throw an error if quest data is invalid', async () => {
        const invalidQuestData = { 
            name: '', 
            description: '',
            difficulty: 'A',
            roleIds: [1, 1], // Duplicate role IDs
            poster_id: 4 
        };

        await expect(addQuestUseCase(mockQuestRepository as any, mockRoleRepository as any, invalidQuestData as any)).rejects.toThrow();
        expect(mockQuestRepository.add).not.toHaveBeenCalled();
    });
});