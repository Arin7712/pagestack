import { AppSidebar } from "@/components/app-sidebar"
import PagesTable from "@/components/PagesTable"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { GetPages } from "@/lib/page"
import { currentUser } from "@clerk/nextjs/server"

export default async function Page() {

      const user = await currentUser();
      if (!user) return;
    
      const userPages = await GetPages(user.id);
      console.log("USER PAGES", userPages);

  return (
    <div className='w-full'>
      <PagesTable userPages={userPages || []} />
    </div>
  )
}
