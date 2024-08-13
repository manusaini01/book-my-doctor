'use client'
// app/login/page.tsx
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import handleFormSubmit from './actions';

export default async function LoginPage({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email || '';

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-fit">
        <CardHeader>
          <CardTitle className="text-2xl">Register Here</CardTitle>
        </CardHeader>

        <form
          action={handleFormSubmit}
          className='space-y-5 px-5 text-xl mb-3'
        >
          <div className='sm:flex block sm:space-x-4'>
            <label className='block'>
              Name
              <input
                name="username"
                type="text"
                className='mt-2 py-2 px-4 block border'
              />
            </label>
            <label className='block'>
              Phone
              <input
                name="phone"
                type="tel"
                className='mt-2 py-2 px-4 block border'
              />
            </label>
          </div>
          <div className='sm:flex block sm:space-x-4'>
            <label className='block'>
              Email
              <input
                name="email"
                type="email"
                defaultValue={email}
                className='mt-2 py-2 px-4 block border'
              />
            </label>
            <label className='block'>
              Password
              <input
                name="password"
                type="password"
                className='mt-2 py-2 px-4 block border'
              />
            </label>

          </div>
          {/* <label className='block'>
            Confirm Password
            <input
              name="confirm-password"
              type="password"
              className='mt-2 py-2 px-4 block border'
            />
          </label> */}
          <label className="block">
            Role
            <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-center">
              <label className="inline-flex items-center mb-2 sm:mb-0 sm:mr-6">
                <input
                  type="radio"
                  name="role"
                  value="hospital"
                  className="form-radio"
                />
                <span className="ml-2">Hospital</span>
              </label>
              <label className="inline-flex items-center mb-2 sm:mb-0 sm:mr-6">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  className="form-radio"
                />
                <span className="ml-2">Doctor</span>
              </label>
              <label className="inline-flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="role"
                  value="receptionist"
                  className="form-radio"
                />
                <span className="ml-2">Receptionist</span>
              </label>
            </div>

          </label>

          <Button className="flex-row-reverse">Log In</Button>
        </form>

        {/* Google Sign-In */}
        <CardFooter>
          <CardContent className='m-auto hover:underline'>
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
