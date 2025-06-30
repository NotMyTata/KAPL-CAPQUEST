import { Profile } from "@/domain/entity/profile";
import { profileRepository } from "@/domain/repository/profileRepository";

export async function getProfileByUserIdUseCase(profileRepo: profileRepository, userId: string) : Promise<Profile | null> {
    return await profileRepo.getProfileByUserId(userId);
}