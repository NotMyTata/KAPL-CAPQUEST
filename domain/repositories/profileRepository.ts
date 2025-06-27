import { createProfileDTO } from "../dto/createProfileDTO";
import { Profile } from "../entities/profile";

export interface profileRepository{
    createNewProfile(
        data: createProfileDTO        
    ) : Promise<Profile | null>

    getProfileByUserId(
        id : string
    ) : Promise<Profile | null>

    updateProfile(
        data: createProfileDTO
    ) : Promise<Profile | null>

    getProfileById(
        id : string
    ) : Promise<Profile | null>
}