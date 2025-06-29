import { Profile } from "../entities/profile";
import { profileRepository } from "../repositories/profileRepository";

export async function getProfileByUserIdUseCase(profileRepo: profileRepository, userId: string) : Promise<Profile | null> {
    return await profileRepo.getProfileByUserId(userId);
}