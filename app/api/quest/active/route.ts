import { fetchActiveQuestListUseCase } from "@/domain/usecase/fetchActiveQuestListUseCase";
import { getCurrentProfileUseCase } from "@/domain/usecase/getCurrentProfileUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();

        const profile = await getCurrentProfileUseCase(profileRepo, userRepo);

        const quest = await fetchActiveQuestListUseCase(questRepo, profile.id);
        return NextResponse.json({ data: quest }, {status: 200});
    } catch (error) {
        let errorMessage = "Unknown Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}