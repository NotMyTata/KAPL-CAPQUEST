import { Profile } from "../entities/profile";
import { profileRepository } from "../repositories/profileRepository";

export async function getProfileByIdUseCase(profileRepo: profileRepository, id: string) : Promise<Profile | null> {
    return await profileRepo.getProfileById(id);
}