import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from 'components/ui/button';
import { DoctorsTable } from './Doctor-table';
import Link from 'next/link';
import { fetchHospitalById } from './actions';

export default function DoctorsPage() {
  // try {
  //   fetchHospitalById();
  //   // console.log(response)
  // } catch (error) {
  //   console.log(error)
  // }
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
          <Link href={`/hospital/dashboard/add_doctor_form`}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Doctor
            </span>
          </Button>
          </Link>
          <Link href={`/hospital/dashboard/add_receptionist_form`}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Receptionist
            </span>
          </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        {/* <DoctorsTable
          doctors={dummyDoctors}
          offset={0}
          totalDoctors={dummyDoctors.length}
        /> */}
        <DoctorsTable/>
      </TabsContent>
    </Tabs>
  );
}
