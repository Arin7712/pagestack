import SettingsForm from "@/components/forms/SettingsForm"
import { GetUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Settings = async() => {

    const user = await currentUser();
    if(!user)
        redirect("/dashboard")

    const dbUser = await GetUser(user.id);
    if(!dbUser)
        redirect("/dashboard")

    const {name, email, profileImage} = dbUser;

    return (
        <main className='w-full'>
           <SettingsForm user={dbUser}/>
        </main>
    )
}

export default Settings