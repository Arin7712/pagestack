import { GetPage } from "@/lib/page"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
      const { slug } = await params
      const page = await GetPage(slug)
    
  return (
    <div>
      Slug: {slug}
      <h1>{page?.pageName}</h1>
      <h1>{page?.startups[0].name}</h1>
    </div>
  )
}