'use client';

import React, { useCallback } from 'react';

// hooks
import { useRouter } from 'next/navigation';

// components
import { SignupForm } from '@components/auth';

export default function Page() {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="col-[1/-1] flex flex-col lg:col-span-6">
      <h1 className="flex flex-col text-center font-sans text-4xl font-extrabold text-gray-900">
        <span className="bg-gradient-to-tr from-[#3466F6] to-[#7c3aed] box-decoration-clone bg-clip-text text-transparent">
          Sign up
        </span>
      </h1>
      <SignupForm />
      <hr className="mt-2 border-t" />
      <button
        type="button"
        onClick={onClick}
        className="mt-6 inline-flex flex-row items-center justify-center self-center rounded-full px-3 py-1 text-center text-base font-semibold text-white outline outline-2 outline-offset-2 outline-transparent"
      >
        <span className="text-blue-600"> &lt;- More options</span>
      </button>
    </div>
  );
}
