'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { ReceptionistCard } from './ReceptionistCard';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useEffect, useState } from 'react';
import { fetchHospitalById } from '../actions';
import { setData } from 'lib/features/hospital/hospitalSlice'; // Import the action
import { usehospitalDispatch, usehospitalSelector } from '@/lib/features/hospital/hospitalHooks';
import { ApiResponse, SelectReceptionist, SelectHospital } from '@/lib/utils/types';
import Alert from '@/lib/utils/alert';
import ReceptionistTable from '../../components/receptionistTable';


export function ReceptionistsTable() {
  const [receptionists, setReceptionists] = useState<SelectReceptionist[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hospitalId, setHospitalId] = useState<string>('');
  const [totalReceptionists, setTotalReceptionists] = useState<number>(0);
  const receptionistsPerPage = 5;

  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = usehospitalDispatch(); // Initialize the dispatch
  const hospital = usehospitalSelector(state => state.hospital.data);


  useEffect(() => {
    const handleFuctions = async () => {
      setIsLoading(true);
      setAlert({ type: 'loading', message: 'loading...' });
      try {
        if (!hospital || !hospital[0]?.hospital_id) {
          const response = await fetchHospitalById();
          if (response && response.data) {
            const hospitalData: SelectHospital = response.data;
            if (hospitalData) {
              dispatch(setData([hospitalData]));
              setHospitalId(hospitalData.hospital_id);
              setAlert({ type: 'success', message: '' });
            } else {
              console.error('No hospital data found in the API response');
              setAlert({ type: 'error', message: 'loading failed' });

              return;
            }
          } else {
            console.error('No hospital data found in the API response');
            setAlert({ type: 'error', message: 'loading failed' });
            return;
          }
        } else {
          setHospitalId(hospital[0].hospital_id);
          setAlert({ type: 'success', message: '' });

        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Always stop loading
        setAlert({ type: 'success', message: '' });
        // Set the alert to null after 5 seconds
        setTimeout(() => {
          setAlert(null);
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    };

    handleFuctions();
  }, [dispatch, hospital]);

  useEffect(() => {
    async function fetchAllReceptionists() {
      if (hospitalId) {  // Check if hospitalId is set
        const response = await fetch(`${process.env.BASE_URL}/api/receptionist/get_all_receptionist?hospital_id=${hospitalId}&offset=${offset}&limit=${receptionistsPerPage}`);
        if (response.ok) {
          const data = await response.json();
          setReceptionists(data.receptionists);
          setTotalReceptionists(data.totalreceptionists);
          if (data.totalreceptionists <= 0) {
            setAlert({ type: 'success', message: 'Please add receptionist' });
          }
          return data;
        } else {
          console.error('Failed to fetch receptionists');
        }
      }
    }

    fetchAllReceptionists();
  }, [hospitalId, offset]);  // Add hospitalId to the dependency array


  function prevPage() {
    if (offset > 0) {
      setOffset(offset - receptionistsPerPage);
    }
  }

  function nextPage() {
    if (offset + receptionistsPerPage < totalReceptionists) {
      setOffset(offset + receptionistsPerPage);
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
        <CardTitle>Receptionists</CardTitle>
      </CardHeader>
      <ReceptionistTable receptionist={receptionists}/>
      {/* <CardContent> 
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {receptionists.map((receptionist) => (
                <ReceptionistCard key={receptionist.receptionist_id} receptionist={receptionist} />
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
              {Math.min(offset + 1, totalReceptionists)}-{Math.min(offset + receptionistsPerPage, totalReceptionists)}
            </strong>{' '}
            of <strong>{totalReceptionists}</strong> Receptionists
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
              disabled={offset + receptionistsPerPage >= totalReceptionists}
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
