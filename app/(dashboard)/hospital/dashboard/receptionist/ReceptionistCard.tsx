import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import { deleteReceptionistById } from './actions';
import { SelectReceptionist } from '@/lib/utils/types';

async function deleteReceptionist(receptionistId: string) {
  try {
    const result = await deleteReceptionistById(receptionistId);
    if (result && !result.error) {
      console.log(`Receptionist with ID: ${receptionistId} deleted successfully.`);
      // Optionally, update the UI or redirect the user
      // e.g., router.push('/some/other/page');
    } else {
      console.error(`Failed to delete Receptionist with ID: ${receptionistId}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function ReceptionistCard({ receptionist }: { receptionist: SelectReceptionist }) {
  return (
    <div className="lg:flex block lg:items-center space-y-4 lg:space-x-4 p-4 border rounded-lg shadow-sm">
      {/* <div className="flex-shrink-0">
        <Image
          alt="Receptionist image"
          className="rounded-md object-cover m-auto"
          height={328}
          width={328}
          src={receptionist.image_url || 'https://images.pexels.com/photos/9888046/pexels-photo-9888046.jpeg'}
        />
      </div> */}
      <div className="lg:text-justify md:text-center">
        <h2 className="text-xl font-semibold">{receptionist.name || 'receptionist Name'}</h2>
        <p className="mt-2"><strong>Email:</strong> {receptionist.email}</p>
        <p className="mt-2"><strong>Contact_info: </strong> {receptionist.contact_info.alternative_number} , {receptionist.contact_info.phone_number }</p>
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
                    deleteReceptionist(receptionist.receptionist_id);
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

export default ReceptionistCard;
