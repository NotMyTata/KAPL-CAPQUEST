import { Profile } from "@/domain/entity/profile";
import { profileRepository } from "@/domain/repository/profileRepository";

export async function getProfileByIdUseCase(profileRepo: profileRepository, id: string) : Promise<Profile | null> {
    return await profileRepo.getProfileById(id);
}