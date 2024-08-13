// app/login/page.tsx

import { Button } from 'components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from 'components/ui/card';
import { handleFormSubmit } from './actions';


const add_hospital_form = () => {
    

    return (
        <div className="flex">
            <Card className="max-w-fit bg-transparent border-none shadow-none">
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
                        Password
                        <input
                            name="hpassword"
                            type="password"
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

                <CardFooter>
                    {/* <CardContent className='m-auto hover:underline'>
              <Link href="/">Back to home page</Link>
            </CardContent> */}


                </CardFooter>
            </Card>
        </div>
    );
}

export default add_hospital_form
