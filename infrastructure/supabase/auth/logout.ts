import { createClient } from "../server";

export async function logout(){
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if ( error ) return Error(error.message)
}