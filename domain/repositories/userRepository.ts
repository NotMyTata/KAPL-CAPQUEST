import { User } from "../entities/user"

export interface userRepository {
    getCurrentUser() : Promise<User | null>
}