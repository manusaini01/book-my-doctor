import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Button } from 'components/ui/button';
// import { DoctorsTable } from './Doctor-table';
// import { dummyDoctors } from 'components/hospital/dummy';

export default function DoctorsPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        {/* <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList> */}
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <Button size="sm" className="h-8 gap-1">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Doctor
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        {/* <DoctorsTable
          doctors={dummyDoctors}
          offset={0}
          totalDoctors={dummyDoctors.length}
        /> */}
      </TabsContent>
    </Tabs>
  );
}
