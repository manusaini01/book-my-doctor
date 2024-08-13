// app/login/page.tsx

import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
// import { signIn } from '@/lib/auth';
import Link from 'next/link';

export default async function Join_us() {

  // Form submission handler
  async function handleFormSubmit(formData: FormData) {
    "use server";
    const hName = formData.get('hname') as string;
    const hEmail = formData.get('hemail') as string;
    const hPhone = formData.get('hphone') as string;
    
    // await signIn("Credentials", { email, password });
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-fit">
        <CardHeader>
          <CardTitle className="text-2xl">Enter Hospital</CardTitle>
        </CardHeader>

        <form
          action={handleFormSubmit}
          className='space-y-5 px-5 text-xl mb-3'
        >
          <label className='block'>
          Hospital Name
        <input
          name="hname"
          type="text"
          className='mt-2 py-2 px-4 block border'
        />
      </label>
          <label className='block'>
        Email
            <input
              name="hemail"
              type="email"
              className='mt-2 py-2 px-4 block border'
            />
          </label>
          <label className='block'>
          Phone
            <input
              name="hphone"
              type="phone"
              className='mt-2 py-2 px-4 block border'
            />
          </label>
          <Button className="flex-row-reverse">Submit</Button>
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
