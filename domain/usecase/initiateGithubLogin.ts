import { loginWithGithub } from "@/infrastructure/supabase/auth/login"

export async function initiateGithubLogin(){
    const callback = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
    const url = await loginWithGithub(callback)
    return url
}