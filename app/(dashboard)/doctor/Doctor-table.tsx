'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Doctor } from './Doctor';
import { SelectDoctor } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DoctorsTable({
  doctors,
  offset,
  totalDoctors
}: {
  doctors: SelectDoctor[];
  offset: number;
  totalDoctors: number;
}) {
  let router = useRouter();
  let doctorsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
        {/* <CardDescription>
          Manage your Doctors and view their profiles.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        {/* need to specify width to maintain consistancy */}
        <div className='grid grid-cols-1 lg:grid-cols-8 gap-4'>
          <div className='lg:col-span-6'>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-1 gap-4 ">
          {doctors.map((doctor) => (
            <Doctor key={doctor.id} doctor={doctor} />
          ))}
        </div>
          </div>
          <div className='lg:col-span-2'>
            {/* free side space */}
          </div>

        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - doctorsPerPage, totalDoctors) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalDoctors}</strong> Doctors
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === doctorsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + doctorsPerPage > totalDoctors}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
