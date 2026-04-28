import PagesTable from "@/components/PagesTable";
import { GetPages } from "@/lib/page";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return;

  const userPages = await GetPages(user.id);
  console.log("USER PAGES", userPages);

  return (
    <main className="flex justify-center items-center">
      {userPages ? <PagesTable userPages={userPages} /> : <div>No pages</div>}
    </main>
  );
};

export default Page;
