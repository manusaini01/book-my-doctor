'use client';
// app/login/page.tsx
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import Link from 'next/link';
import Alert from '@/lib/utils/alert';
import { useState } from 'react';
import handleFormSubmitAction, { SignUp } from './actions'; // Renamed import to avoid conflict

// Interface for form data

export default function LoginPage({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email || '';

  // Initial form data state
  const initialFormData: SignUp = {
    name: '',
    email: email, // Pre-fill email from searchParams if available
    password: '',
    role: '', // Default empty role
  };

  // States for form data, alert, and loading
  const [formData, setFormData] = useState<SignUp>(initialFormData);
  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setAlert({ type: 'loading', message: 'Submitting form...' });

    try {
      const result = await handleFormSubmitAction(formData); // Use the renamed action function
      if (result?.error) {
        setAlert({ type: 'error', message: `Error: ${result.error}` });
      } else {
        setAlert({ type: 'success', message: 'Form submitted successfully.' });
        setFormData(initialFormData); // Reset form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({ type: 'error', message: 'An error occurred during form submission.' });
    } finally {
      setIsLoading(false); // Stop loading

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-fit">
      {alert && (
        <div className="mt-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
        <CardHeader>
          <CardTitle className="text-2xl">Register Here</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 text-xl mb-3">
          <div className="sm:flex block sm:space-x-4">
            <label className="block">
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="mt-2 py-2 px-4 block border"
              />
            </label>
          </div>
          <div className="sm:flex block sm:space-x-4">
            <label className="block">
              Email
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                className="mt-2 py-2 px-4 block border"
              />
            </label>
            <label className="block">
              Password
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                className="mt-2 py-2 px-4 block border"
              />
            </label>
          </div>
          <label className="block">
            Role
            <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-center">
              <label className="inline-flex items-center mb-2 sm:mb-0 sm:mr-6">
                <input
                  type="radio"
                  name="role"
                  value="hospital"
                  onChange={handleChange}
                  checked={formData.role === 'hospital'}
                  className="form-radio"
                />
                <span className="ml-2">Hospital</span>
              </label>
              <label className="inline-flex items-center mb-2 sm:mb-0 sm:mr-6">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  onChange={handleChange}
                  checked={formData.role === 'doctor'}
                  className="form-radio"
                />
                <span className="ml-2">Doctor</span>
              </label>
              <label className="inline-flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="role"
                  value="receptionist"
                  onChange={handleChange}
                  checked={formData.role === 'receptionist'}
                  className="form-radio"
                />
                <span className="ml-2">Receptionist</span>
              </label>
            </div>
          </label>

          <Button type="submit" className="flex-row-reverse" disabled={isLoading}>
            Submit
          </Button>
        </form>

        {/* Google Sign-In */}
        <CardFooter>
          <CardContent className="m-auto hover:underline">
            <Link href="/">Back to home page</Link>
          </CardContent>

          {/* Uncomment and configure if needed for Google sign-in */}
          {/* <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Sign in with Google</Button>
          </form> */}
        </CardFooter>
      </Card>
    </div>
  );
}
