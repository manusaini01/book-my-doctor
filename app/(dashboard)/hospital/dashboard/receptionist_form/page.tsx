'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { add_receptionist, ReceptionistFormData } from './actions';
import Link from 'next/link';
import { usehospitalDispatch, usehospitalSelector } from '@/lib/features/hospital/hospitalHooks';
import { fetchHospitalById } from '../actions';
import { SelectHospital } from '@/lib/utils/types';
import { setData } from '@/lib/features/hospital/hospitalSlice';
import Alert from '@/lib/utils/alert';

const AddReceptionistForm = () => {
  // Initialize state with type
  const router = useRouter();
  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = usehospitalDispatch(); // Initialize the dispatch
  const hospital = usehospitalSelector(state => state.hospital.data);
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    hospital_id: '', // Ensure you have the hospital ID ready
    hospital_name: '', 
    contact_info: {
      phone_number: '',
      alternative_number: ''
    },
    // image_url: 'https://images.pexels.com/photos/40568/medical-appointment-Receptionist-healthcare-40568.jpeg',
  }

  const [formData, setFormData] = useState<ReceptionistFormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => {
      if (name === 'phone_number' || name === 'alternative_number') {
        return {
          ...prevState,
          contact_info: {
            ...prevState.contact_info,
            [name]: value,
          },
        };
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

 
  const handleFetchAndAddReceptionist = async (formData: any) => {
    try {
      let updatedFormData = { ...formData };
      setIsLoading(true);
    setAlert({ type: 'loading', message: 'Adding Receptionist...' });
    
      // Convert `contact_info` and `shift_details` to valid JSON strings
      updatedFormData.contact_info = JSON.stringify(formData.contact_info);
  
      // Existing logic to handle hospital ID
      if (!hospital || !hospital[0]?.hospital_id) {
        const response = await fetchHospitalById();
        if (response && response.data) {
          const hospitalData: SelectHospital = response.data;
          if (hospitalData) {
            dispatch(setData([hospitalData]));
            updatedFormData.hospital_id = hospitalData.hospital_id;
            updatedFormData.hospital_name = hospitalData.name;
          } else {
            console.error('No hospital data found in the API response');
        setAlert({ type: 'warning', message: `No hospital found` });
            return;
          }
        } else {
        setAlert({ type: 'warning', message: `No hospital found` });
          console.error('No hospital data found in the API response');
          return;
        }
      } else {
        updatedFormData.hospital_id = hospital[0].hospital_id;
        updatedFormData.hospital_name = hospital[0].name;
      }
  
      const result = await add_receptionist(updatedFormData);
      if (result) {
        console.log('Receptionist added successfully');
        setAlert({ type: 'success', message: `Receptionist added successfully` });
        setFormData(initialFormData);
      } else {
        console.error('Failed to add Receptionist');
        setAlert({ type: 'success', message: `Failed to add Receptionist` });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ type: 'success', message: `Failed to add Receptionist` })
    }
    finally {
      setIsLoading(false); // Always stop loading
  
      // Set the alert to null after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };
  
  
    
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Check for required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.contact_info 
    ) {
      console.error('Please fill out all required fields');
      return;
    }
    // If all required fields are filled, proceed with submitting the form
    handleFetchAndAddReceptionist(formData); 
  };
  

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
         
      <Card className="w-full max-w-3xl bg-white shadow-lg">
       {alert && (
         <div className="mt-4">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Enter Receptionist Details</CardTitle>
        </CardHeader>

        <form
          onSubmit={handleFormSubmit} // Use onSubmit for handling the form submission
          className="space-y-6 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700">Receptionist Name</span>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Contact Info - Phone Number</span>
              <input
                name="phone_number"
                type="text"
                value={formData.contact_info.phone_number}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Contact Info - Alternative Number</span>
              <input
                name="alternative_number"
                type="text"
                value={formData.contact_info.alternative_number}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

          </div>

          <div className="flex justify-end">
            <Link href={`/hospital/dashboard`}>
              <Button type="reset" className="px-6 py-2 mr-5 bg-white shadow-slate-300 shadow-lg  text-black rounded hover:bg-gray-100 ">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="px-6">Submit</Button>
          </div>
        </form>

        <CardFooter>
          <CardContent className="text-center text-blue-500 hover:underline">
            {/* <Link href="/">Back to home page</Link> */}
          </CardContent>
        </CardFooter>
      </Card>
    </div>
    </>
  );
};

export default AddReceptionistForm;
