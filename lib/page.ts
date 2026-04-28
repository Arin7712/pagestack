"use server";

import { prisma } from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

type startupsSchema = {
    name: string,
    description: string,
    navLink: string,
    favIcon: string,
    revenue: number,
    userCount: number
}
type formSchema = {
    name : string,
    description: string,
    favIcon: string,
    startups: startupsSchema[]
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

export async function CreatePage(data : formSchema){

    const user = await currentUser();
    if(!user)
        return;

    try{
        const page = await prisma.page.create({
            data : {
                slug: generateSlug(data.name),
                pageName: data.name,
                description: data.description,
                favIcon: data.favIcon,
                authorId: user?.id
            }
        })

        const startup = await prisma.startups.createMany({
            data: data.startups.map(startup => ({
                name: startup.name,
                description: startup.description,
                navLink: startup.navLink,
                favIcon: startup.favIcon,
                revenue: startup.revenue,
                userCount: startup.userCount,
                authorId: page.id
            }))
        })

        console.log("PAGE CREATED SUCCESSFULLY", page)
        return page;
    }catch(error){
        console.log(error)
    }
}

export async function GetPages(clerkId: string){
    try{
        const pages = await prisma.page.findMany({
            where: {
                authorId: clerkId
            },
            include: {
                startups: true
            }
        })

        return pages;
    }catch(error){
        console.log(error)
    }
}

// Get an individual page
export async function GetPage(slug: string){
    try{
        const pages = await prisma.page.findUnique({
            where: {
                slug: slug
            },
            include: {
                startups: true
            }
        })

        return pages;
    }catch(error){
        console.log(error)
    }
}