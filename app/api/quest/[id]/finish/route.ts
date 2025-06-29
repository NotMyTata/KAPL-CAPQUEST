import { finishQuestUseCase } from "@/domain/usecase/finishQuestUseCase";
import { getCurrentUserUseCase } from "@/domain/usecase/getCurrentUserUseCase";
import { getProfileByUserIdUseCase } from "@/domain/usecase/getProfileByUserIdUseCase";
import { updateRatingUseCase } from "@/domain/usecase/updateRatingUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: {params: { id: number } }) {
    try {
            const questRepo = new SupabaseQuestRepository();
            const userRepo = new SupabaseUserRepository();
            const profileRepo = new SupabaseProfileRepository();
    
            const { id } = await params;
            
            const user = await getCurrentUserUseCase(userRepo);
            if (!user) {
                return NextResponse.json({ error: "User not logged in" }, { status: 400 });
            }
    
            const profile = await getProfileByUserIdUseCase(profileRepo, user.id);
            if (!profile) {
                return NextResponse.json({ error: "Profile doesn't exist" }, { status: 400 });
            }
    
            const quest = await finishQuestUseCase(questRepo, id, profile.id);
            if (!quest) {
                return NextResponse.json({ error: "Quest doesn't exist" }, { status: 400 });
            }

            if (!quest.freelancer) {
                return NextResponse.json({ error: "Freelancer doesn't exist" }, { status: 400 });
            }

            const updatedProfile = await updateRatingUseCase(profileRepo, questRepo, id, quest.freelancer.id);

            return NextResponse.json({ data: {quest, updatedProfile} }, { status: 200 });
        } catch (error) {
            let errorMessage = "Unknown Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }
}