import { fetchMyActiveQuestsUseCase } from "@/application/usecase/fetchMyActiveQuestsUseCase";
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { SupabaseQuestRepository } from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { SupabaseUserRepository } from "@/infrastructure/supabase/repository/userRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const questRepo = new SupabaseQuestRepository();
    const userRepo = new SupabaseUserRepository();
    const profileRepo = new SupabaseProfileRepository();
    const user = await userRepo.getCurrentUser();

    if (!user) {
        return NextResponse.json({error: "User not logged in" }, {status: 400});
    }

    const profile = await profileRepo.getProfileByUserId(user.id);

    if (!profile) {
        return NextResponse.json({ error: "User does not exist" }, {status: 400});
    }

    const quest = await fetchMyActiveQuestsUseCase(questRepo, profile.id);
    return NextResponse.json({ data: quest }, {status: 200});
}