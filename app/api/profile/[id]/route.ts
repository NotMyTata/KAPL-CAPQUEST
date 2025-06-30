import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { NextResponse } from "next/server";
import { getProfileByIdUseCase } from "@/domain/usecase/getProfileByIdUseCase";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profileRepo = new SupabaseProfileRepository();
  const profile = await getProfileByIdUseCase(profileRepo, (await params).id);

  if (!profile) {
    return NextResponse.json({
      error: "Profile not found",
      status: 400,
    });
  }

  return NextResponse.json({
    data: profile,
    status: 200,
  });
}