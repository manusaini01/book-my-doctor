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
import { add_doctor, DoctorFormData } from './actions';
import Link from 'next/link';
import { usehospitalDispatch, usehospitalSelector } from '@/lib/features/hospital/hospitalHooks';
import { fetchHospitalById } from '../actions';
import { SelectHospital } from '@/lib/utils/types';
import { setData } from '@/lib/features/hospital/hospitalSlice';
import Alert from '@/lib/utils/alert';

const AddDoctorForm = () => {
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
    specialization: '',
    qualifications: '',
    contact_info: {},
    image_url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
  }
  const [formData, setFormData] = useState<DoctorFormData>(initialFormData);

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFetchAndAddDoctor = async (formData: any) => {
    try {
      let updatedFormData = { ...formData };
      setIsLoading(true);
      setAlert({ type: 'loading', message: 'loading' });

      if (!hospital || !hospital[0]?.hospital_id) {
        // Fetch hospital data if not available
        const response = await fetchHospitalById();
        if (response && response.data) {
          const hospitalData: SelectHospital = response.data;
        console.log(hospitalData, "hospitalData")

          if (hospitalData) {
            dispatch(setData([hospitalData]));
            updatedFormData = { ...updatedFormData, hospital_id: hospitalData.hospital_id };
            console.log(updatedFormData, "updatedFormData")

            // Update the form data state before proceeding
            setFormData(updatedFormData);
          } else {
            setAlert({ type: 'error', message: 'loading failed' });

            console.error('No hospital data found in the API response');
            return; // Exit if no hospital data is found
          }
        } else {
          setAlert({ type: 'error', message: 'loading failed' });
          console.error('No hospital data found in the API response');
          return; // Exit if no hospital data is found
        }
      } else {
        // If hospital data is already present
        updatedFormData = { ...updatedFormData, hospital_id: hospital[0].hospital_id };
        console.log(updatedFormData, "updatedFormData")

        // Update the form data state before proceeding
        setFormData(updatedFormData);
      }

      // Proceed with adding the doctor with the updated formData
      const result = await add_doctor(updatedFormData);
      if (result) {
        setAlert({ type: 'success', message: 'Doctor added successfully' });
        console.log('Doctor added successfully');
        setFormData(initialFormData);
      } else {
        console.error('Failed to add doctor');
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


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check for required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.specialization ||
      !formData.contact_info ||
      !formData.qualifications
    ) {
      console.error('Please fill out all required fields');
      return;
    }

    // If all required fields are filled, proceed with submitting the form
    handleFetchAndAddDoctor(formData);
  };

  // ${process.env.BASE_URL}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl bg-white shadow-lg">
      {alert && (
          <div className="mt-4">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Enter Doctor Details</CardTitle>
        </CardHeader>

        <form
          onSubmit={handleFormSubmit} // Use onSubmit for handling the form submission
          className="space-y-6 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700">Doctor Name</span>
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

            {/* Optional Fields Start Here */}
            <label className="block">
              <span className="text-gray-700">Specialization</span>
              <input
                name="specialization"
                type="text"
                value={formData.specialization || ''}
                required
                onChange={handleChange}
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Qualifications</span>
              <textarea
                name="qualifications"
                value={formData.qualifications || ''}
                required
                onChange={handleChange}
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Contact Info</span>
              <textarea
                name="contact_info"
                required
                onChange={handleChange}
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Image URL</span>
              <input
                name="image_url"
                type="url"
                required
                value={formData.image_url || ''}
                onChange={handleChange}
                className="mt-2 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            {/* Optional Fields End Here */}
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
  );
};

export default AddDoctorForm;
