import { profileRepository } from "@/domain/repository/profileRepository";
import { createClient } from "../server";
import { createProfileDTO } from "@/domain/dto/createProfileDTO";
import { Profile } from "@/domain/entity/profile";
import { updateRatingDTO } from "@/domain/dto/updateRatingDTO";

export class SupabaseProfileRepository implements profileRepository {
    async createNewProfile(
        data: createProfileDTO
    ): Promise<Profile> {
        const supabase = await createClient()
        const { data: profile, error } = await supabase
            .from('user')
            .insert({
                username : data.username,
                description : data.description,
                rating : data.rating,
                avatar : data.avatar,
                user_id : data.user_id
            })
            .select()
            .single()
        
        if (error) throw new Error(error.message)

        return {
            id : profile.id,
            username : profile.username,
            description : profile.description,
            rating : profile.rating,
            avatar : profile.avatar,
            user_id : profile.user_id
        }
    }

    async getProfileByUserId(id : string) : Promise<Profile | null> {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('user_id', id)
            .single()

        if (error) return null

        return {
            id : data.id,
            username : data.username,
            description : data.description,
            rating : data.rating,
            avatar : data.avatar,
            user_id : id
        }
    }

    async updateProfile(data: createProfileDTO): Promise<Profile | null> {
        const supabase = await createClient()

        const { data: profile, error } = await supabase
            .from('user')
            .update({
                username: data.username,
                description: data.description,
                rating: data.rating,
                avatar: data.avatar,
                user_id: data.user_id
            })
            .eq('id', data.id)
            .select()
            .single();
        
        if (error) throw new Error(error.message)
        if (!profile) return null;

        return {
            id : profile.id,
            username : profile.username,
            description : profile.description,
            rating : profile.rating,
            avatar : profile.avatar,
            user_id : profile.user_id
        } 
    }

    async getProfileById(id: string): Promise<Profile | null> {
        const supabase = await createClient()

        const { data , error } = await supabase
            .from('user')
            .select('*')
            .eq('id', id)
            .single()

        if ( error ) throw new Error(error.message)
        
        return {
            id : data.id,
            username : data.username,
            description : data.description,
            rating : data.rating,
            avatar : data.avatar,
            user_id : id
        }
    }

    async updateRating(data: updateRatingDTO): Promise<Profile | null> {
        const supabase = await createClient()

        const { data: profile, error } = await supabase
            .from('user')
            .update({
                rating: data.rating
            })
            .eq('id', data.id)
            .select()
            .single()

        if (error) throw new Error(error.message)
        if (!profile) return null
        
        return {
            id : profile.id,
            username : profile.username,
            description : profile.description,
            rating : profile.rating,
            avatar : profile.avatar,
            user_id : profile.user_id
        } 
    }
}