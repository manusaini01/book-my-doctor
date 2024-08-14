'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function LoginWithInput() {
  const [email, setEmail] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`/login?email=${email}`);
  };

  return (
    <div className="flex items-center border border-teal-500 rounded-lg shadow-md overflow-hidden">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 w-auto px-4 py-2 focus:outline-none"
      />
      <button
        className="bg-teal-500 flex hover:bg-teal-600 text-white font-semibold py-2 px-4 transition-colors duration-300"
        onClick={handleLoginClick}
      >
        Login 
        <span className='sm:flex hidden'>&nbsp; here</span>
      </button>
    </div>
  );
}
