import { createProfileDTO } from "@/domain/dto/createProfileDTO";
import { profileRepository } from "@/domain/repository/profileRepository";

export async function updateProfileUseCase(
    dto : createProfileDTO,
    profileRepository : profileRepository
){
    const repo = profileRepository

    const result = repo.updateProfile(dto)

    return result
}