import { addQuestUseCase } from "@/domain/usecase/addQuestUseCase";
import { fetchQuestListUseCase } from "@/domain/usecase/fetchQuestListUseCase";
import { getCurrentProfileUseCase } from "@/domain/usecase/getCurrentProfileUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseRoleRepository } from "@/infrastructure/supabase/repository/roleRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const quests = await fetchQuestListUseCase(questRepo);

        return NextResponse.json({ data: quests }, { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const roleRepo = new SupabaseRoleRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();

        const body = await req.json();

        const profile = await getCurrentProfileUseCase(profileRepo, userRepo);

        const quest = await addQuestUseCase(questRepo, roleRepo, {
            name: body.name,
            description: body.description,
            difficulty: body.difficulty,
            poster_id: profile.id,
            roleIds: body.roleIds
        });

        return NextResponse.json({ data: quest }, { status: 201 });
        
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