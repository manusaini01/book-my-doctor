import React, { Suspense } from 'react'
import JoinButton from './joinBtn'
import LoginWithInput from './loginBtn'
import Link from 'next/link'

const HeroComp = () => {
    return (
        <div>
            <div className='h-screen bg-cover bg-center'>
                <div className="px-6 space-y-3 grid text-center text-black place-content-center h-full relative isolate  after:absolute after:z-[-1] after:inset-0 after:bg-pink-700 after:opacity-90 after:bg-[url(/desktop-2.jpeg)] after:bg-top after:bg-cover ">
                    <h1 className="font-semibold text-4xl tracking-wide">Welcome to Bookmeaslot</h1>
                    <p className="text-xs text-center leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi obcaecati voluptatibus quasi minus ex laborum.</p>
                    <div className=''>
                        {/* <Link href='/join_us_form'>
                        <JoinButton btn_text="Join Us Now" />
                        </Link> */}
                        <Link href='/signup' className=' ml-10'>
                        <JoinButton btn_text="Join Us Now" />
                        </Link>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginWithInput />
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default HeroComp
