import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
       
        <form
          action={async (formData) => {
            "use server"
            await signIn("Credentials", formData)
        }}
        className='space-y-5 space-x-5 w-full mb-3'
      >
          <label className='block'>
            Email
            <input name="email" type="email" className=' block border'/>
          </label>
          <label className='block'>
            Password
            <input name="password" type="password" className=' block border'/>
          </label >
          <Button className="">Sign In</Button>
        </form>

        {/* google */}
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Sign in with Google</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
