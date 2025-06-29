import { createClient } from "@/infrastructure/supabase/server"
import { NextResponse } from "next/server"

export async function GET(){
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if(error) return NextResponse.json({
        error : error.message,
        status : 400
    })

    return NextResponse.json({
        message : "Logout successful",
        status : 200
    })
}