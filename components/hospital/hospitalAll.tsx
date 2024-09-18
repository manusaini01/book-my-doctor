import Image from 'next/image';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from 'components/ui/table';
import { SelectHospital } from '@/lib/utils/types';
// import { SelectHospital } from 'app/(dashboard)/admin/dashboard/actions';


interface Props {
  hospital: SelectHospital;
  onDelete: (user_id: string, hospitalId: string) => void;
}

const MyHospital = ({ hospital, onDelete }: Props) => {
  const handleCardClick = async () => {
    // Handle card click logic if needed
  };

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    onDelete(hospital.user_id, hospital.hospital_id);
  };

  return (
    <TableRow onClick={handleCardClick} className='cursor-pointer'>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Hospital logo"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={hospital.logo}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{hospital.name}</TableCell>
      <TableCell>{hospital.phone_number}</TableCell>
      <TableCell className="overflow-hidden text-ellipsis whitespace-normal break-words overflow-wrap break-word hidden md:table-cell">{hospital.description}</TableCell>
      <TableCell className="hidden md:table-cell">{hospital.city}</TableCell>
      <TableCell className="hidden md:table-cell">{hospital.state}</TableCell>
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
            <DropdownMenuItem onClick={handleDelete}>
              {/* <form onSubmit={handleDelete}>
                <button type="submit"> */}
                  Delete
                  {/* </button>
              </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default MyHospital;
