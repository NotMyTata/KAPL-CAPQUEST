import { createProfileDTO } from "../dto/createProfileDTO";
import { updateRatingDTO } from "../dto/updateRatingDTO";
import { Profile } from "../entity/profile";

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

    updateRating(
        data: updateRatingDTO
    ) : Promise<Profile | null>
}