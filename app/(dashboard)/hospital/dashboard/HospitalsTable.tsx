'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from 'components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { SelectHospital } from '../../../../lib/db_actions/hospitalDB'; // Assuming similar structure to SelectProduct
import { useRouter } from 'next/navigation';
import { Button } from 'components/ui/button';
import Hospital from 'components/hospital/hospital';

export function HospitalsTable({
  hospitals,
  offset,
  totalHospitals
}: {
  hospitals: SelectHospital[];
  offset: number;
  totalHospitals: number;
}) {
  let router = useRouter();
  let hospitalsPerPage = 5;
console.log(hospitals, "manu")
  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/hospital/dashboard?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospitals</CardTitle>
        {/* <CardDescription>
          Manage your hospitals and view their details.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Dentists</TableHead>
              <TableHead className="hidden md:table-cell">Experience</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Consultation Fees</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital) => (
              <Hospital key={hospital.id} hospital={hospital} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - hospitalsPerPage, totalHospitals) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalHospitals}</strong> hospitals
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === hospitalsPerPage}
            >
              {/* <ChevronLeft className="mr-2 h-4 w-4" /> */}
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + hospitalsPerPage > totalHospitals}
            >
              Next
              {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
