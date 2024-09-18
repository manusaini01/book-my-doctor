// app/hospitals/page.tsx
import { Tabs, TabsContent } from 'components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from 'components/ui/button';
import { HospitalsTable } from './HospitalsTable'; // Ensure this path is correct
import Link from 'next/link';
import { getHospitals } from './actions';

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? '0';
  const { hospitals, newOffset, totalHospitals } = await getHospitals(
    search,
    Number(offset)
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-end mb-4">
        <Link href={`/admin/dashboard/add_hospital_form`}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Hospital
            </span>
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsContent value="all">
          {hospitals && hospitals.length > 0 ? (
            <HospitalsTable
              hospitals={hospitals}
              offset={Number(offset)}
              totalHospitals={totalHospitals}
            />
          ) : (
            <p>No hospitals found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
