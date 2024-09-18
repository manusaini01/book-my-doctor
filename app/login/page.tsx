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
import Alert from '@/lib/utils/alert'; // Assuming you have an Alert component
import { useState } from 'react';
import handleFormSubmitAction, { Login } from './actions'; // Adjusted import name to avoid conflicts



export default function LoginPage({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email || '';

  // Initial form data state
  const initialFormData: Login = {
    email: email, // Pre-fill email from searchParams if available
    password: '',
  };

  // States for form data, alert, and loading
  const [formData, setFormData] = useState<Login>(initialFormData);
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
      const result = await handleFormSubmitAction(formData); // Use the action function
      if (result.error) {
        setAlert({ type: 'warning', message: `${result.error}` });
      } else if(result.message === "Login successful"){
        setAlert({ type: 'success', message: 'Login successful.' });
        setFormData(initialFormData); // Reset form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({ type: 'error', message: 'An error occurred during login.' });
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
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 text-xl mb-3">
          <label className="block">
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 py-2 px-4 block border"
            />
          </label>
          <label className="block">
            Password
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 py-2 px-4 block border"
            />
          </label>
          <Button type="submit" className="flex-row-reverse" disabled={isLoading}>
            Log In
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
