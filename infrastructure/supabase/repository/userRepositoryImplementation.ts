import { userRepository } from "@/domain/repository/userRepository";
import { createClient } from "../server";

export class SupabaseUserRepository implements userRepository {

    async getCurrentUser() {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.getUser()

        if ( error || !data.user ) return null

        return {
            id : data.user.id,
            email : data.user.email,
            username : data.user.user_metadata?.user_name,
            avatar : data.user.user_metadata?.avatar_url
        }
    }
}