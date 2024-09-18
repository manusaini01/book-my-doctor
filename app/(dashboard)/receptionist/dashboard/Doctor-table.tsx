'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Doctor } from './Doctor';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useEffect, useState } from 'react';
import { fetchDoctorsByAssignment, fetchReceptionistById } from './actions';
import { setData } from 'lib/features/receptionist/receptionistSlice'; // Import the action
import { usereceptionistDispatch, usereceptionistSelector } from '@/lib/features/receptionist/receptionistHooks';
import { SelectDoctor, SelectReceptionist } from '@/lib/utils/types';

export function DoctorsTable() {
  const [doctors, setDoctors] = useState<SelectDoctor[]>([]); // State for storing doctors
  const [offset, setOffset] = useState<number>(0);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const doctorsPerPage = 5;

  const router = useRouter();
  const dispatch = usereceptionistDispatch(); // Initialize the dispatch
  const Receptionist = usereceptionistSelector(state => state.receptionist.data);

  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetchDoctorsByAssignment(Receptionist[0]?.hospital_id, Receptionist[0]?.receptionist_id);
      console.log('loading')
      const data = await response.data;
      if (data) {
        console.log(typeof doctors);
        setDoctors(data);
      }
    }
    fetchDoctors();
  }, [Receptionist, offset])


  useEffect(() => {
    async function fetchReceptionistData() {
      try {
        const response = await fetchReceptionistById();
        const receptionistData: SelectReceptionist = response.data
        if (receptionistData) {
          dispatch(setData([receptionistData])); // Pass the receptionist data as an array to match the state structure
        }
      } catch (error) {
        console.error('Failed to fetch receptionist data', error);
      }
    }

    fetchReceptionistData();
  }, [dispatch]); // Add dispatch as a dependency

  function prevPage() {
    if (offset > 0) {
      setOffset(offset - doctorsPerPage);
    }
  }

  function nextPage() {
    if (offset + doctorsPerPage < totalDoctors) {
      setOffset(offset + doctorsPerPage);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {doctors.map((doctor) => (
                <Doctor key={doctor.doctor_id} doctor={doctor} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            {/* free side space */}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset + 1, totalDoctors)}-{Math.min(offset + doctorsPerPage, totalDoctors)}
            </strong>{' '}
            of <strong>{totalDoctors}</strong> Doctors
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              disabled={offset + doctorsPerPage >= totalDoctors}
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
