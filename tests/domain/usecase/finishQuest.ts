// import { finishQuestUseCase } from "@/domain/usecase/finishQuestUseCase";


// describe('finishQuestUseCase', () => {
//     let questId = 1;
//     let posterId = 1;
//     let freelancerId = 2;
//     let mockValidActiveQuest = {
//         id: questId,
//         difficulty: 'A',
//         is_available: false,
//         is_finished: false,
//         poster: { id: posterId },
//         freelancer: { id: freelancerId },
//     };
//     let mockValidFinishedQuest = {
//         id: questId,
//         difficulty: 'A',
//         is_available: false,
//         is_finished: true,
//         poster: { id: posterId },
//         freelancer: { id: freelancerId },
//     };
//     let mockValidProfile = {
//         id: freelancerId,
//         rating: 4.5,
//     }
//     let mockValidUpdateRating = {
//         id: freelancerId,
//         rating: 5,
//     }
//     let mockQuestRepository: any;
//     let mockProfileRepository: any;

//     beforeEach(() => {
//         mockQuestRepository = {
//             finish: jest.fn(),
//             findById: jest.fn(),
//         };
//         mockProfileRepository = {
//             getProfileById: jest.fn(),
//             updateRating: jest.fn(),
//         };
//         jest.clearAllMocks();
//     });

//     it('should finish a quest successfully', async () => {
//         mockQuestRepository.findById.mockResolvedValue(mockValidActiveQuest);
//         mockQuestRepository.finish.mockResolvedValue(mockValidFinishedQuest);
//         mockProfileRepository.getProfileById.mockResolvedValue(mockValidUpdateRating);
//         mockProfileRepository.updateRating.mockResolvedValue(mockValidUpdateRating);

//         const result = await finishQuestUseCase(mockQuestRepository, mockProfileRepository, questId, posterId);

//         expect(mockQuestRepository.findById).toHaveBeenCalledWith(questId);
//         expect(mockQuestRepository.finish).toHaveBeenCalledWith(questId);
//         expect(mockProfileRepository.getProfileById).toHaveBeenCalledWith(freelancerId.toString());
//         expect(mockProfileRepository.updateRating).toHaveBeenCalledWith({ id: freelancerId, rating: 5 });
//         expect(result).toEqual({ quest: mockValidFinishedQuest, newRating: 5 });
//     });

//     it('should throw an error if data is not valid', async () => {
//         mockQuestRepository.findById.mockResolvedValue(null);
//         mockQuestRepository.fetchQuestApplicant.mockResolvedValue(null);

//         await expect(acceptApplicantUseCase(mockQuestRepository, questId, posterId, applicantId)).rejects.toThrow();
//     });

//     it('should throw an error if repository throws', async () => {
//         mockQuestRepository.findById.mockRejectedValue(new Error('DB error'));
//         mockQuestRepository.fetchQuestApplicant.mockRejectedValue(new Error('DB error'));
//         mockQuestRepository.accept.mockRejectedValue(new Error('DB error'));

//         await expect(acceptApplicantUseCase(mockQuestRepository, questId, posterId, applicantId)).rejects.toThrow('DB error');
//     });
// });