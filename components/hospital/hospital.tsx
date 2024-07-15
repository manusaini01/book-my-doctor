import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';

const MyHospital = ({ hospital }) => {

  function deleteHospital(){
    return;
  }

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {/* <Image
          alt="Hospital logo"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={hospital.logoUrl}
          width="64"
        /> */}
        
        <Image
          alt="Hospital logo"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`https://chdcityhospital.com/wp-content/uploads/2022/08/image-e1660376330654.jpeg`}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{hospital.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {hospital.ad ? 'AD' : 'Non-AD'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{hospital.dentistsCount} Dentist{hospital.dentistsCount > 1 ? 's' : ''}</TableCell>
      <TableCell className="hidden md:table-cell">{hospital.experience}</TableCell>
      <TableCell className="hidden md:table-cell">{hospital.location}</TableCell>
      <TableCell className="hidden md:table-cell">{`₹${hospital.consultationFee} Consultation Fees`}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteHospital }>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default MyHospital ;

// Sample data structure for the hospital prop
// const sampleHospital = {
//   logoUrl: 'https://path-to-logo.com/logo.jpg',
//   name: 'Life Care Dental and Implant Centre',
//   ad: true,
//   dentistsCount: 2,
//   experienceRange: '9 - 27 years',
//   location: 'Manimajra',
//   consultationFees: 500,
// };

// Example usage
// const HospitalDashboard = () => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Logo</th>
//           <th>Name</th>
//           <th>Type</th>
//           <th>Dentists</th>
//           <th>Experience</th>
//           <th>Location</th>
//           <th>Consultation Fees</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         <Hospital hospital={sampleHospital} />
//       </tbody>
//     </table>
//   );
// };

// export default HospitalDashboard;
