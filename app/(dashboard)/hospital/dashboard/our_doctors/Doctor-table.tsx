'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Doctor } from '../Doctor';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useEffect, useState } from 'react';
import { fetchHospitalById, getDoctors } from '../actions';
import { setData } from 'lib/features/hospital/hospitalSlice'; // Import the action
import { usehospitalDispatch, usehospitalSelector } from '@/lib/features/hospital/hospitalHooks';
import { ApiResponse, SelectDoctor, SelectHospital } from '@/lib/utils/types';
import Alert from '@/lib/utils/alert';
import DoctorTable from '../../components/doctorTable';

export function DoctorsTable() {
  const [doctors, setDoctors] = useState<SelectDoctor[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hospitalId, setHospitalId] = useState<string>('');
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const doctorsPerPage = 5;

  const router = useRouter();

  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = usehospitalDispatch(); // Initialize the dispatch
  const hospital = usehospitalSelector(state => state.hospital.data);

  useEffect(() => {
    const handleFuctions = async () => {
      try {

        setIsLoading(true);
        setAlert({ type: 'loading', message: 'loading...' });
        if (!hospital || !hospital[0]?.hospital_id) {
          const response = await fetchHospitalById();
          if (response && response.data) {
            const hospitalData: SelectHospital = response.data;
            if (hospitalData) {
              dispatch(setData([hospitalData]));
              setHospitalId(hospitalData.hospital_id);
            } else {
              console.error('No hospital data found in the API response');
              setAlert({ type: 'error', message: 'loading failed' });
              return;
            }
          } else {
            setAlert({ type: 'error', message: 'loading failed' });
            console.error('No hospital data found in the API response');
            return;
          }
        } else {
          setHospitalId(hospital[0].hospital_id);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      finally {
        setIsLoading(false); // Always stop loading
    
        // Set the alert to null after 5 seconds
        setTimeout(() => {
          setAlert(null);
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    };

    handleFuctions();
  }, [dispatch, hospital]);

  useEffect(() => {
    async function getAllDoctors() {
      if (hospitalId) {  // Check if hospitalId is set
        const response = await getDoctors(hospitalId, '', offset);
        if (response) {
          console.log(response)
          setDoctors(response.doctors);
          setTotalDoctors(response.totalDoctors);
          return response;
        } else {
          console.error('Failed to fetch receptionists');
        }
      }
    }
    getAllDoctors();
  }, [hospitalId, offset]);  // Add hospitalId to the dependency array



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
       {alert && (
        <div className="mt-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>
      <DoctorTable doctor={doctors}/>

      {/* <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {doctors.map((doctor) => (
                <Doctor key={doctor.doctor_id} doctor={doctor} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
          </div>
        </div>
      </CardContent> */}
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
