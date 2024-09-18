'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { Button } from 'components/ui/button';
import MyHospital from 'components/hospital/hospitalAll'; // Ensure this path is correct
import { deleteHospitalById } from './actions';
import Alert from '@/lib/utils/alert'; // Ensure this path is correct
import { SelectHospital } from '@/lib/utils/types';

interface HospitalsTableProps {
  hospitals: SelectHospital[];
  offset: number;
  totalHospitals: number;
}

export function HospitalsTable({
  hospitals: initialHospitals,
  offset,
  totalHospitals
}: HospitalsTableProps) {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const hospitalsPerPage = 5;

  const handleDelete = async (user_id: string, hospitalId: string) => {
    setIsLoading(true);
    setAlert({ type: 'loading', message: 'Deleting hospital...' });
    try {
      const result = await deleteHospitalById(user_id);
      if (result.error) {
        setAlert({ type: 'error', message: `Error deleting hospital: ${result.error}` });
      } else {
        setHospitals(hospitals.filter(hospital => hospital.hospital_id !== hospitalId));
        setAlert({ type: 'success', message: 'Hospital deleted successfully.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const prevPage = () => {
    if (offset > 0) {
      router.push(`/hospitals?page=${Math.max(offset - hospitalsPerPage, 0)}`);
    }
  };

  const nextPage = () => {
    if (offset + hospitalsPerPage < totalHospitals) {
      router.push(`/hospitals?page=${offset + hospitalsPerPage}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospitals</CardTitle>
      </CardHeader>
      <CardContent>
        {alert && (
          <div className="mb-4">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead className="hidden md:table-cell">State</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map(hospital => (
              <MyHospital key={hospital.hospital_id} hospital={hospital} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset + 1, totalHospitals)}-{Math.min(offset + hospitalsPerPage, totalHospitals)}
            </strong>{' '}
            of <strong>{totalHospitals}</strong> hospitals
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              disabled={offset === 0 || isLoading}
            >
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              disabled={offset + hospitalsPerPage >= totalHospitals || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
