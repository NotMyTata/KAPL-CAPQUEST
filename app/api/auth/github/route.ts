import { initiateGithubLogin } from "@/application/usecase/initiateGithubLogin";
import { NextResponse } from "next/server";

export async function GET(){
    const result = await initiateGithubLogin();

    if (result instanceof Error) {
        return NextResponse.json({
            error: result.message,
            status: 400
        });
    }

    return NextResponse.redirect(result);
}