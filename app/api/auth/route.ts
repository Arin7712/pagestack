import { CreateUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    
    const user = await currentUser();

    if(!user)
        return NextResponse.redirect(new URL("/sign-in", request.url))

    await CreateUser({
        name: user.firstName || '',
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
        clerkId: user.id,
    })

    console.log("User created successfully")
    redirect("/create")
}