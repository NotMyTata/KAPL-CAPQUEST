import { registerUseCase } from "@/application/usecase/registerUseCase"
import { SupabaseAuthRepository } from "@/infrastructure/supabase/repository/loginRepositoryImplementation"
import { SupabaseProfileRepository } from "@/infrastructure/supabase/repository/profileRepositoryImplementation"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const body = await req.json()

    const authRepo = new SupabaseAuthRepository()
    const profileRepo = new SupabaseProfileRepository()

    try{
        const  data  = await registerUseCase({
            email : body.email,
            password : body.password
        }, authRepo)

        return NextResponse.json({
            data : data,
            status : 201
        })
    }catch (err: unknown){
        let errorMessage = "Unknown error"
        if (err instanceof Error){
            errorMessage = err.message
        }
        return NextResponse.json(
            {error : errorMessage},
            {status : 400}
        )
    }
}