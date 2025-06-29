import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";

export async function updateRatingUseCase(profileRepo: SupabaseProfileRepository, questRepo: SupabaseQuestRepository, questId: number, freelancerId: number) {
    const existingQuest = await questRepo.findById(questId);
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.is_available) throw new Error("Quest is still available");
    if (!existingQuest.is_finished) throw new Error("Quest is still not finished");
    if (!existingQuest.freelancer) throw new Error("No freelancer exist");
    if (existingQuest.freelancer.id !== freelancerId) throw new Error("Freelancer ID doesn't match");
    if (existingQuest.poster.id === freelancerId) throw new Error("Quest poster cannot update their own rating");

    const existingUserProfile = await profileRepo.getProfileById(freelancerId.toString());
    if (!existingUserProfile) throw new Error("User doesn't exist");

    const base = getDifficultyBase(existingQuest.difficulty);
    const multiplier = getRatingMultiplier(existingUserProfile.rating);
    const gain = Math.round(base * multiplier);

    const newRating = existingUserProfile.rating + gain;

    return await profileRepo.updateRating({
        id: freelancerId,
        rating: newRating
    })
}

function getDifficultyBase(difficulty: string): number {
    switch (difficulty) {
        case "A": return 100;
        case "B": return 80;
        case "C": return 60;
        case "D": return 40;
        case "E": return 20;
        case "F": return 10;
        default: return 0;
    }
}

function getRatingMultiplier(currentRating: number): number {
    if (currentRating >= 1800) return 0.5;
    if (currentRating >= 1440) return 0.6;
    if (currentRating >= 1080) return 0.7;
    if (currentRating >= 720) return 0.8;
    if (currentRating >= 360) return 0.9;
    return 1.0;
}