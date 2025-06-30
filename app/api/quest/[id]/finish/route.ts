import { finishQuestUseCase } from "@/domain/usecase/finishQuestUseCase";
import { getCurrentProfileUseCase } from "@/domain/usecase/getCurrentProfileUseCase";
import { updateRatingUseCase } from "@/domain/usecase/updateRatingUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: {params: Promise<{ id: number }> }) {
    try {
            const questRepo = new SupabaseQuestRepository();
            const userRepo = new SupabaseUserRepository();
            const profileRepo = new SupabaseProfileRepository();
    
            const { id } = await params;
            
            const profile = await getCurrentProfileUseCase(profileRepo, userRepo);

            const { quest, newRating } = await finishQuestUseCase(questRepo, profileRepo, id, profile.id);

            return NextResponse.json({ data: { quest, newRating } }, { status: 200 });
        } catch (error) {
            let errorMessage = "Unknown Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }
}