import { acceptApplicantUseCase } from "@/application/usecase/acceptApplicantUseCase";
import { fetchQuestByIdUseCase } from "@/application/usecase/fetchQuestByIdUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {params: { id: number } }) {
    const questRepo = new SupabaseQuestRepository();
    const { id } = await params;
    const quest = await fetchQuestByIdUseCase(questRepo, id);

    if (!quest) {
        return NextResponse.json({ error: "Quest not found" }, { status: 400 });
    }

    return NextResponse.json({ data: quest }, { status: 200 })
}

export async function POST(req: Request, { params }: {params: { id: number } }) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();

        const { id } = await params;
        const body = await req.json();

        const user = await userRepo.getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "User not logged in" }, { status: 400 });
        }

        const profile = await profileRepo.getProfileByUserId(user.id);
        if (!profile) {
            return NextResponse.json({ error: "Profile doesn't exist" }, { status: 400 });
        }

        await acceptApplicantUseCase(questRepo, id, profile.id, body.freelancer_id);

        return NextResponse.json({ message: "Successfully accepted applicant" }, { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}