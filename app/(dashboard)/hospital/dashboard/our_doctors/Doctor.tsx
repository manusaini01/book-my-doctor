import Image from 'next/image';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import { deleteDoctorById } from './actions';
import { SelectDoctor } from '@/lib/utils/types';

async function deleteDoctor(doctorId: string) {
  try {
    const result = await deleteDoctorById(doctorId);
    if (result && !result.error) {
      console.log(`Doctor with ID: ${doctorId} deleted successfully.`);
      // Optionally, update the UI or redirect the user
      // e.g., router.push('/some/other/page');
    } else {
      console.error(`Failed to delete doctor with ID: ${doctorId}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function Doctor({ doctor }: { doctor: SelectDoctor }) {
  return (
    <div className="lg:flex block lg:items-center space-y-4 lg:space-x-4 p-4 border rounded-lg shadow-sm">
      <div className="flex-shrink-0">
        <Image
          alt="Doctor image"
          className="rounded-md object-cover m-auto"
          height={328}
          width={328}
          src={doctor.image_url || 'https://images.pexels.com/photos/9888046/pexels-photo-9888046.jpeg'}
        />
      </div>
      <div className="lg:text-justify md:text-center">
        <h2 className="text-xl font-semibold">{doctor.name || 'Doctor Name'}</h2>
        <p className="mt-2"><strong>Email:</strong> {doctor.email}</p>
        <p className="mt-2"><strong>Specialization: </strong>{doctor.specialization || 'Specialization'}</p>
        <p className="mt-2"><strong>Experience:</strong> {doctor.experience ? `${doctor.experience} years` : 'Experience'}</p>
        <p className="mt-2"><strong>Educational Qualification:</strong> {doctor.qualifications || 'MBBS, MD'}</p>
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" variant="outline">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteDoctor(doctor.doctor_id);
                  }}
                >
                  <Button type="submit" variant="outline">
                    Delete
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
