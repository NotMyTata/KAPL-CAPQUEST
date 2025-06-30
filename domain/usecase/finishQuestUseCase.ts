import { profileRepository } from "../repository/profileRepository";
import { questRepository } from "../repository/questRepository";
import { calculateNewRating } from "../services/ratingUtils";

export async function finishQuestUseCase(questRepo: questRepository, profileRepo: profileRepository, questId: number, posterId: number) {
    try {
        const existingQuest = await questRepo.findById(questId);
        if (!existingQuest) throw new Error("Quest not found");
        if (existingQuest.poster.id !== posterId) throw new Error("Only quest poster can finish quest");
        if (existingQuest.is_available) throw new Error("Quest is still available");
        if (existingQuest.is_finished) throw new Error("Quest is already finished");
        if (!existingQuest.freelancer) throw new Error("Freelancer doesn't exist");

        const updatedQuest = await questRepo.finish(questId);

        if (!updatedQuest) throw new Error("Failed to finish quest");
        if (!updatedQuest.freelancer) throw new Error("Freelancer doesn't exist after finishing quest");
        if (!updatedQuest.difficulty) throw new Error("Quest difficulty is not defined");

        const existingProfile = await profileRepo.getProfileById(updatedQuest.freelancer.id.toString());
        if (!existingProfile) throw new Error("Freelancer profile not found");

        const newRating = calculateNewRating(updatedQuest.difficulty, existingProfile.rating);

        await profileRepo.updateRating({ id: updatedQuest.freelancer.id, rating: newRating });

        return { quest: updatedQuest, newRating };
    } catch (error) {
        throw error;
    }
}