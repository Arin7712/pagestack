import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Prisma } from "@/generated/prisma/client";


type UserPages = Prisma.PageGetPayload<{
  include: {
    startups: true;
  };
}>;

const PagesTable = ({ userPages }: { userPages: UserPages[] }) => {
  return (
    <Table className="border">
      <TableCaption>A list of your recent indie pages.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Slug</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
            userPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.slug}</TableCell>
                <TableCell>{page.pageName}</TableCell>
                <TableCell>{page.description}</TableCell>
                <TableCell className="text-right">
                    <Link href={`/${page.slug}`}>Visit</Link>
                </TableCell>
              </TableRow>
            ))
        }
    
      </TableBody>
    </Table>
  );
};

export default PagesTable;
