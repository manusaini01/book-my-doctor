import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HospitalsTable } from './HospitalsTable'; // Assuming you have a HospitalsTable component
import { getHospitals } from '@/lib/db'; // Assuming a function to fetch hospitals

export default async function HospitalsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { hospitals, newOffset, totalHospitals } = await getHospitals(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="specialized" className="hidden sm:flex">
            Specialized
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Hospital
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <HospitalsTable
          hospitals={hospitals}
          offset={newOffset ?? 0}
          totalHospitals={totalHospitals}
        />
      </TabsContent>
    </Tabs>
  );
}
