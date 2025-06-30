import { createNewProfile } from "@/domain/usecase/createNewUserProfile";
import { getCurrentProfileUseCase } from "@/domain/usecase/getCurrentProfileUseCase";
import { getCurrentUserUseCase } from "@/domain/usecase/getCurrentUserUseCase";
import { getProfileByUserIdUseCase } from "@/domain/usecase/getProfileByUserIdUseCase";
import { updateProfileUseCase } from "@/domain/usecase/updateProfile";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try {
        const userRepo = new SupabaseUserRepository()
        const profileRepo = new SupabaseProfileRepository()

        const profile = await getCurrentProfileUseCase(profileRepo, userRepo)

        return NextResponse.json({ data : profile }, { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown Error"
        if (error instanceof Error) {
            errorMessage = error.message
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

export async function POST(req: Request){
    try{

        const userRepo = new SupabaseUserRepository()
        const profileRepo = new SupabaseProfileRepository()

        const body = await req.json()

        const user = await getCurrentUserUseCase(userRepo);
        if(!user){
            return NextResponse.json({
                error: "User not logged in", 
                status: 400
            })
        }

        const username = user.username
        const avatar = user.avatar

        const profile = await createNewProfile(userRepo , profileRepo,{
            username,
            avatar,
            description : body.description || "", 
            rating : 0
        })

        return NextResponse.json({
            data : profile,
            status : 201
        })
    }catch ( err : unknown){
        let errorMessage = "Unknown Error"
        if ( err instanceof Error){
            errorMessage = err.message
        }
        return NextResponse.json({
            error : errorMessage,
            status : 400
        })
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const userRepo = new SupabaseUserRepository();
    const profileRepo = new SupabaseProfileRepository();

    const user = await getCurrentUserUseCase(userRepo);
    if (!user) {
        return NextResponse.json({ error: "User not found", status: 400 });
    }

    const profile = await getProfileByUserIdUseCase(profileRepo, user.id);
    if (!profile) {
        return NextResponse.json({ error: "Profile not found", status: 400 });
    }

    const updatedProfile = await updateProfileUseCase(
        { ...body, id: profile.id, user_id: user.id },
        profileRepo
    );

    if (!updatedProfile) {
        return NextResponse.json({ error: "Update not successful", status: 400 });
    }

    return NextResponse.json({ data: updatedProfile, status: 201 });
}