import { User } from "@/domain/entity/user";
import { userRepository } from "@/domain/repository/userRepository";

export async function getCurrentUserUseCase(userRepo: userRepository): Promise<User | null> {
    return await userRepo.getCurrentUser();
}