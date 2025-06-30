import { User } from "../entity/user"

export interface userRepository {
    getCurrentUser() : Promise<User | null>
}