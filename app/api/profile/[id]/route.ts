import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation";
import { NextResponse } from "next/server";
import { profileRepository } from "@/domain/repositories/profileRepository";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const profileRepo = new SupabaseProfileRepository();
  const profile = await profileRepo.getProfileById(params.id);

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