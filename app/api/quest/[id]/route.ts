import QuestRepositoryImpl from "@/infrastructure/supabase/repository/questRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET({ params }: {params: { id: number } }) {
    const questRepo = new QuestRepositoryImpl();
    const quest = await questRepo.findById(params.id);

    if (!quest) {
        return NextResponse.json({ error: "Quest not found" }, { status: 400 });
    }

    return NextResponse.json({ data: quest }, { status: 200 })
}