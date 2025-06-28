import { loginUseCase } from "@/application/usecase/loginUseCase"
import { SupabaseAuthRepository } from "@/infrastructure/supabase/repository/loginRepositoryImplementation"
import { NextResponse } from "next/server"

export async function POST(req : Request){
    const body = await req.json()

    const authRepo = new SupabaseAuthRepository()

    try {
        const result = await loginUseCase({
            email : body.email,
            password : body.password
        }, authRepo
        )

        return NextResponse.json(result)
    } catch (err: unknown){
        let errorMessage = "Unknown error";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return NextResponse.json(
            {error : errorMessage},
            {status : 400}
        )
    }
}