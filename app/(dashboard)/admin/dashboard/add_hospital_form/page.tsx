'use client'
// app/login/page.tsx
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { add_hospital, HospitalFormData } from './actions';
import Alert from '@/lib/utils/alert';
import Link from 'next/link';


const AddHospitalForm = () => {
  // Initialize state with type
  const router = useRouter();
  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialFormData = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    description: '',
    city: '',
    state: '',
    logo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
  }
  const [formData, setFormData] = useState<HospitalFormData>(initialFormData);

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true);
    setAlert({ type: 'loading', message: 'Adding hospital...' });

    try {
      const result = await add_hospital(formData);
      if (result?.error) {
        setAlert({ type: 'error', message: `Error adding hospital: ${result.error}` });
      }
      else {
        setAlert({ type: 'success', message: 'Hospital added successfully.' });
        setFormData(initialFormData);
      }
      // Redirect to another page or show success message
    } catch (error) {

      console.error('Error submitting form:', error);

    } finally {
      setIsLoading(false); // Always stop loading

      // Set the alert to null after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };

  return (
    <>
      {alert && (
        <div className="mt-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-3xl bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Enter Hospital Details</CardTitle>
          </CardHeader>

          <form
            onSubmit={handleFormSubmit} // Use onSubmit for handling the form submission
            className="space-y-6 p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-gray-700">Hospital Name</span>
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
                <span className="text-gray-700">Phone</span>
                <input
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border border-gray-300 rounded"
                />
              </label>

              {/* Optional Fields Start Here */}
              <label className="block">
                <span className="text-gray-700">Description</span>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">City</span>
                <input
                  name="city"
                  type="text"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">State</span>
                <input
                  name="state"
                  type="text"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Logo</span>
                <input
                  name="logo"
                  type="url"
                  value={formData.logo || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded"
                />
              </label>
              {/* Optional Fields End Here */}
            </div>

            <div className="flex align-bottom justify-end">
              <Link href={`/admin/dashboard`}>
                <Button type="reset" className="px-6 py-2 mr-5 bg-white shadow-slate-300 shadow-lg  text-black rounded hover:bg-gray-100 ">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="px-6">Submit</Button>
            </div>

            {/* <div className="flex justify-end">
            <Button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit
            </Button>
          </div> */}
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

export default AddHospitalForm;
