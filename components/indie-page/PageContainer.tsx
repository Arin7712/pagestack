import Image from "next/image";

type startupsSchema = {
  name: string;
  description: string;
  navLink: string;
  favIcon: string;
  revenue: number;
  userCount: number;
};
type formSchema = {
  pageName: string;
  slug: string;
  description: string;
  renderedHtml: string;
  favIcon: string;
  startups: startupsSchema[];
};

export const PageContainer = ({ page }: { page: formSchema }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        slug: {page.slug}
        <div className="flex flex-col gap-6">
          <Image
            src={page.favIcon}
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="md:text-3xl font-semibold">{page?.pageName}</h1>
          <p>{page?.description}</p>
          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{
              __html: page.renderedHtml,
            }}
          />
        </div>
      </div>

      <div>
        <h1>{page?.startups[0].name}</h1>
      </div>
    </div>
  );
};
