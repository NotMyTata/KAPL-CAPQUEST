import { createClient } from "../server"

export async function registerWithEmail(email: string, password: string){
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`
        }
    }) 

    if (error) throw new Error(error.message)
        
    return data
}