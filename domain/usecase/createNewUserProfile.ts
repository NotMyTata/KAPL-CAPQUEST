import { createProfileDTO } from "@/domain/dto/createProfileDTO"
import { profileRepository } from "@/domain/repository/profileRepository"
import { userRepository } from "@/domain/repository/userRepository"

export async function createNewProfile(
  userRepo: userRepository,
  profileRepo: profileRepository,
  dto: createProfileDTO
) {
  const user = await userRepo.getCurrentUser()
  if (!user) throw new Error("User not logged in")

  const existing = await profileRepo.getProfileByUserId(user.id)
  if (existing) throw new Error("Profile already exists")

  return await profileRepo.createNewProfile({
    ...dto,
    user_id: user.id,
  })
}
