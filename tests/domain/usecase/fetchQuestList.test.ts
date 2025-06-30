import { fetchQuestListUseCase } from '@/domain/usecase/fetchQuestListUseCase';

describe("fetchQuestListUseCase", () => {
    let mockQuestRepository: any;

    beforeEach(() => {
        mockQuestRepository = {
            fetchQuestList: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it("should return quest list from repository", async () => {
        const mockQuests = [
            { id: 1, name: "Quest 1" },
            { id: 2, name: "Quest 2" },
        ];
        mockQuestRepository.fetchQuestList.mockResolvedValue(mockQuests);

        const result = await fetchQuestListUseCase(mockQuestRepository as any);

        expect(mockQuestRepository.fetchQuestList).toHaveBeenCalled();
        expect(result).toEqual(mockQuests);
    });

    it("should propagate errors from repository", async () => {
        mockQuestRepository.fetchQuestList.mockRejectedValue(new Error("Failed to fetch"));

        await expect(fetchQuestListUseCase(mockQuestRepository as any)).rejects.toThrow("Failed to fetch");
        expect(mockQuestRepository.fetchQuestList).toHaveBeenCalled();
    });
});