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
import { SelectDoctor } from '@/lib/utils/types';
// import { SelectDoctor } from '@/lib/db';

function deleteDoctor() {
  // Implement delete functionality here
  return;
}


export function Doctor({ doctor }: { doctor: SelectDoctor }) {
console.log(doctor)
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
        <p className="mt-2"><strong>Email:</strong> {doctor.email || 'MON TO SAT: 09:00 AM TO 01:00 PM & 04:00 PM TO 08:00 PM'}</p>
        <p className="text-gray-500"><strong>specialization:</strong> {doctor.specialization || 'Specialization'}</p>
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
                <form onSubmit={deleteDoctor}>
                  <button type="submit">Delete</button>
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
