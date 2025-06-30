import { Profile } from "@/domain/entity/profile";
import { profileRepository } from "@/domain/repository/profileRepository";
import { userRepository } from "@/domain/repository/userRepository";

export async function getCurrentProfileUseCase(profileRepository: profileRepository, userRepo: userRepository): Promise<Profile> {
    const currentUser = await userRepo.getCurrentUser();
    if (!currentUser) throw new Error("User not logged in");

    const profile = await profileRepository.getProfileByUserId(currentUser.id);
    if (!profile) throw new Error("Profile not found");

    return profile;
}