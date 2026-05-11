"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./prisma";
import { UTApi } from "uploadthing/server";


type UserProps = {
    name: string,
    email: string,
    clerkId: string
    profileImage: string
}

const utapi = new UTApi();

export  async function CreateUser({name, email, clerkId, profileImage }: UserProps)
{
    try{

        const response = await fetch(profileImage);
        
        const blob = await response.blob();

        const file = new File(
            [blob],
            "profile-image.jpg",
            {
                type: blob.type
            }
        )

        const uploadedFile = await utapi.uploadFiles(file);

        const uploadedImageUrl = uploadedFile.data?.ufsUrl;

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                clerkId: clerkId,
                profileImage: uploadedImageUrl || "",
            }
        })

        return user
    }catch(error)
    {
        console.log(error)
    }
}

export async function UpdateUser(id: string,data: {name: string, email: string, profileImage: string}) {
    try{    
        const user = await prisma.user.update({
            where: {
                clerkId: id
            },
            data: {
                name: data.name,
                email: data.email,
                profileImage: data.profileImage
            }
        })
    }catch(error){
        console.log(error)
    }
}

export async function GetUser(id: string){
    try{
        const user = await prisma.user.findUnique({
            where: {
                clerkId: id
            },

        })

        return user;
    }catch(error){
        console.log(error)
    }
}
