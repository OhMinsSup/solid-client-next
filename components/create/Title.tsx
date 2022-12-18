'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormFieldValues } from 'app/create/layout';

const Title = () => {
  const { register } = useFormContext<FormFieldValues>();

  return (
    <div style={{ lineHeight: '1.375' }}>
      <textarea
        maxLength={150}
        placeholder="Article title…"
        className="mb-5 mt-2 h-[86px] w-full resize-none appearance-none overflow-hidden bg-transparent px-4 font-sans text-3xl font-extrabold text-gray-900 outline-none md:text-4xl"
        spellCheck="false"
        {...register('title')}
      />
    </div>
  );
};

export default Title;
