import { addQuestUseCase } from "@/application/usecase/addQuestUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseRoleRepository } from "@/infrastructure/supabase/repository/roleRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const questRepo = new SupabaseQuestRepository();
    const quest = await questRepo.fetchAllQuests();

    return NextResponse.json({ data: quest }, { status: 200 });
}

export async function POST(req: Request) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const roleRepo = new SupabaseRoleRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();
        const body = await req.json();

        const user = await userRepo.getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "User not logged in" }, { status: 400 });
        }

        const profile = await profileRepo.getProfileByUserId(user.id);
        if (!profile) {
            return NextResponse.json({ error: "Profile doesn't exist" }, { status: 400 })
        }

        await addQuestUseCase(questRepo, roleRepo, {
            name: body.name,
            description: body.description,
            difficulty: body.difficulty,
            poster_id: profile.id,
            roleIds: body.roleIds
        });

        return NextResponse.json({ message: "New quest successfully added "}, { status: 201 });
        
    } catch (error) {
            let errorMessage = "Unknown Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    
}