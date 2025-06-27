import { User } from "@/domain/entities/user";
import { authRepository } from "@/domain/repositories/authRepository";
import { createClient } from "../server";

export class SupabaseAuthRepository implements authRepository {
    async login(email: string, password: string): Promise<User> {
        const supabase = await createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,password
        })

        if (error) throw new Error(error.message)

        return data.user
    }

    async register(email: string, password: string): Promise<User> {
        const supabase = await createClient()

        const {data, error } = await supabase.auth.signUp({
            email, password
        })

        if(error) throw new Error(error.message)

        if(!data.user){
            throw new Error("Registration failed")
        }

        return data.user
    }
}