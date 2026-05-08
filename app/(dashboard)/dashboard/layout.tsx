import { AppSidebar } from "@/components/app-sidebar";
import PagesTable from "@/components/PagesTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GetPages } from "@/lib/page";
import { currentUser } from "@clerk/nextjs/server";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {/* <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex items-center justify-center w-full md:p-6 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default layout;
