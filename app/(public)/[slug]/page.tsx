import { PageContainer } from "@/components/indie-page/PageContainer";
import { GetPage } from "@/lib/page";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await GetPage(slug);
  if(!page)
    redirect("/dashboard")
  return (
    <main className="p-[3rem]">
      <PageContainer page={page}/>
    </main>
  );
}
