import { User } from "../entities/user"

export interface authRepository{
    login(email : string, password: string) : Promise<User>
    register(email: string, password: string) : Promise<User>
}