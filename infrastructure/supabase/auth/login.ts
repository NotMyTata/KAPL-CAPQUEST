import { createClient } from "../server"

export async function loginWithEmail(email: string, password: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword(
        {
            email,
            password
        }  
    )

     if (error) return Error(error.message)

    return data
}

export async function loginWithGithub(url: string){
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options:{
            redirectTo: url
        }
    })

    if (error) return Error(error.message)

    return data.url
}