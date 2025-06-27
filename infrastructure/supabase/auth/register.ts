import { createClient } from "../server"

export async function registerWithEmail(email: string, password: string){
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
        email, 
        password
    }) 

    if (error) throw new Error(error.message)
        
    return data
}