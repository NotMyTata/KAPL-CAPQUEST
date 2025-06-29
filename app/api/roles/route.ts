import { fetchAllRolesUseCase } from "@/domain/usecase/fetchAllRolesUseCase";
import { SupabaseRoleRepository } from "@/infrastructure/supabase/repository/roleRepositoryImplementation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const roleRepo = new SupabaseRoleRepository();
    const roles = await fetchAllRolesUseCase(roleRepo);

    return NextResponse.json({ data: roles }, { status: 200 });
}