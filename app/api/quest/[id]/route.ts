import { acceptApplicantUseCase } from "@/domain/usecase/acceptApplicantUseCase";
import { fetchQuestByIdUseCase } from "@/domain/usecase/fetchQuestByIdUseCase";
import { getCurrentProfileUseCase } from "@/domain/usecase/getCurrentProfileUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {params: Promise<{ id: number }> }) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();

        const { id } = await params;

        const profile = await getCurrentProfileUseCase(profileRepo, userRepo);

        const quest = await fetchQuestByIdUseCase(questRepo, id, profile.id);

        return NextResponse.json({ data: quest }, { status: 200 })
    } catch (error) {
        let errorMessage = "Unknown Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

export async function POST(req: Request, { params }: {params: Promise<{ id: number }> }) {
    try {
        const questRepo = new SupabaseQuestRepository();
        const userRepo = new SupabaseUserRepository();
        const profileRepo = new SupabaseProfileRepository();

        const { id } = await params;
        const body = await req.json();

        const profile = await getCurrentProfileUseCase(profileRepo, userRepo);

        const applicant = await acceptApplicantUseCase(questRepo, id, profile.id, body.freelancer_id);

        return NextResponse.json({ data: applicant }, { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown Error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}