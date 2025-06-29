import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";

export async function updateRatingUseCase(profileRepo: SupabaseProfileRepository, questRepo: SupabaseQuestRepository, questId: number, freelancerId: number) {
    const existingQuest = await questRepo.findById(questId);
    if (!existingQuest) throw new Error("Quest not found");
    if (existingQuest.is_available) throw new Error("Quest is still available");
    if (!existingQuest.is_finished) throw new Error("Quest is still not finished");
    if (!existingQuest.freelancer_id) throw new Error("No freelancer exist");
    if (existingQuest.freelancer_id !== freelancerId) throw new Error("Freelancer ID doesn't match");
    
    const existingUserProfile = await profileRepo.getProfileById(freelancerId.toString());
    if (!existingUserProfile) throw new Error("User doesn't exist");

    // TODO: implement a real rating system
    const newRating = existingUserProfile.rating + 5;

    return await profileRepo.updateRating({
        id: freelancerId.toString(),
        rating: newRating
    })
}