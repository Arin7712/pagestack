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

type Startups = {
  id: number;
  name: string;
  description: string;
  navLink: string;
  favIcon: string;
  revenue: number;
  userCount: number;
};
type UserPages = {
  id: number;
  slug: string;
  pageName: string;
  description: string;
  favIcon: string;
  startups: Startups[];
};
const PagesTable = ({ userPages }: { userPages: UserPages[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
