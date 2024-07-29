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
import { useRouter } from 'next/router';

interface Props {
  hospital: {
    id: number;
  name: string;
  type: string;
  dentists: number;
  experience: string;
  location: string;
  consultationFee: string;
  };
}

const MyHospital = ({ hospital }: Props) => {
  // const router = useRouter(); 

  const handleCardClick = async () => {
    const response = await fetch('/api/redirect-to-doctor');
    if (!response.ok) {
        // Handle error
    }
    window.location.href = '/doctor'; // Or handle the redirect based on response
};

  function deleteHospital() {
    // Implement delete functionality here
  }

  return (
    <TableRow onClick={handleCardClick} className='cursor-pointer'>
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
          { 'Non-AD'}
          {/* {hospital.ad ? 'AD' : 'Non-AD'} */}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{2} Dentist{2 > 1 ? 's' : ''}</TableCell>
      {/* <TableCell className="hidden md:table-cell">{hospital.dentistsCount} Dentist{hospital.dentistsCount > 1 ? 's' : ''}</TableCell> */}
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
              <form onSubmit={deleteHospital}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default MyHospital;
