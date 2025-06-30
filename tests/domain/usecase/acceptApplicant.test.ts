import { acceptApplicantUseCase } from '@/domain/usecase/acceptApplicantUseCase';

describe('acceptApplicantUseCase', () => {
    let questId = 1;
    let posterId = 1;
    let applicantId = 2;
    let mockValidQuest = {
        id: questId,
        is_available: true,
        is_finished: false,
        poster: { id: posterId },
        freelancer: null,
    };
    let mockValidQuestApplicant = {
        quest_id: questId,
        freelancer_id: applicantId,
    };
    let mockQuestRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            accept: jest.fn(),
            findById: jest.fn(),
            fetchQuestApplicant: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should accept an applicant successfully', async () => {
        mockQuestRepository.findById.mockResolvedValue(mockValidQuest);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(mockValidQuestApplicant);
        mockQuestRepository.accept.mockResolvedValue(true);

        const result = await acceptApplicantUseCase(mockQuestRepository, questId, posterId, applicantId);

        expect(mockQuestRepository.findById).toHaveBeenCalledWith(questId);
        expect(mockQuestRepository.fetchQuestApplicant).toHaveBeenCalledWith(questId, applicantId);
        expect(mockQuestRepository.accept).toHaveBeenCalledWith(questId, applicantId);
        expect(result).toBe(true);
    });

    it('should throw an error if data is not valid', async () => {
        mockQuestRepository.findById.mockResolvedValue(null);
        mockQuestRepository.fetchQuestApplicant.mockResolvedValue(null);

        await expect(acceptApplicantUseCase(mockQuestRepository, questId, posterId, applicantId)).rejects.toThrow();
    });

    it('should throw an error if repository throws', async () => {
        mockQuestRepository.findById.mockRejectedValue(new Error('DB error'));
        mockQuestRepository.fetchQuestApplicant.mockRejectedValue(new Error('DB error'));
        mockQuestRepository.accept.mockRejectedValue(new Error('DB error'));

        await expect(acceptApplicantUseCase(mockQuestRepository, questId, posterId, applicantId)).rejects.toThrow('DB error');
    });
});