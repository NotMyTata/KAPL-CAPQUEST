import { applyToQuestUseCase } from "@/domain/usecase/applyToQuestUseCase";

describe('applyToQuestUseCase', () => {
    let questId = 1;
    let profileId = 1;
    let mockValidQuest = {
        id: questId,
        is_available: true,
        is_finished: false,
        poster: { id: 2 },
        freelancer: null,
    };
    let mockNullQuestApplicant = null;
    let mockQuestRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            apply: jest.fn(),
            findById: jest.fn(),
            fetchQuestApplicant: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should apply to a quest with valid data', async () => {
        mockQuestRepository.findById.mockResolvedValue(mockValidQuest);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(mockNullQuestApplicant );
        mockQuestRepository.apply.mockResolvedValue({ success: true });

        const result = await applyToQuestUseCase(mockQuestRepository as any, questId, profileId);

        expect(mockQuestRepository.apply).toHaveBeenCalledWith(questId, profileId);
        expect(result).toEqual({ success: true });
    });

    it('should throw an error if applying to quest fails', async () => {
        mockQuestRepository.apply.mockRejectedValue(new Error('Failed to apply'));
        mockQuestRepository.findById.mockResolvedValue(mockValidQuest);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(mockNullQuestApplicant);

        await expect(applyToQuestUseCase(mockQuestRepository as any, questId, profileId)).rejects.toThrow('Failed to apply');
    });

    it('should throw an error if quest invalid', async () => {
        mockQuestRepository.findById.mockResolvedValue(null);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(mockNullQuestApplicant);

        await expect(applyToQuestUseCase(mockQuestRepository as any, questId, profileId)).rejects.toThrow();
    });

    it('should throw an error if user have already applied', async () => {
        let mockQuestApplicant = { quest_id: questId, freelancer_id: profileId };

        mockQuestRepository.findById.mockResolvedValue(mockValidQuest);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(mockQuestApplicant);

        await expect(applyToQuestUseCase(mockQuestRepository as any, questId, profileId)).rejects.toThrow('User already applied');
    });
});