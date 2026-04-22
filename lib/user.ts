import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./prisma";


type UserProps = {
    name: string,
    email: string,
    clerkId: string
    profileImage: string
}


export  async function CreateUser({name, email, clerkId, profileImage }: UserProps)
{
    try{
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                clerkId: clerkId,
                profileImage: profileImage,
            }
        })

        return user
    }catch(error)
    {
        console.log(error)
    }
}

