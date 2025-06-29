import { loginWithGithub } from "@/infrastructure/supabase/auth/login"

export async function initiateGithubLogin(){
    const callback = 'http://localhost:3000/auth/callback'
    const url = await loginWithGithub(callback)
    return url
}