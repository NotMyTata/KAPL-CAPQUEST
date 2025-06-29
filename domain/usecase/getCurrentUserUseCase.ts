import { User } from "../entities/user";
import { userRepository } from "../repositories/userRepository";

export async function getCurrentUserUseCase(userRepo: userRepository): Promise<User | null> {
    return await userRepo.getCurrentUser();
}