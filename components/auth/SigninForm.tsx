'use client';
import React, { useMemo } from 'react';
import classNames from 'classnames';

// hooks
import { useForm } from 'react-hook-form';

// components
import { LoadingIcon } from '@components/ui/Icon';
import { ValidationMessage } from '@components/ui/Error';

// types
import type { SubmitHandler } from 'react-hook-form';

interface FormFieldValues {
  email: string;
  password: string;
}

const SigninForm = () => {
  const defaultValues: FormFieldValues = useMemo(() => {
    return {
      email: 'mins5190@naver.com',
      password: '1q2w3e4r!@',
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFieldValues>({
    reValidateMode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    console.log(input);
  };

  return (
    <form
      method="post"
      className="mb-4 mt-9 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="font-semibold text-black">
          Email
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className="mb-2 mt-2 w-full rounded-md border bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
            {...register('email')}
          />
        </label>
        {errors?.['email'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={errors?.['email']?.message}
          />
        ) : null}
        <label className="font-semibold text-black">
          Password
          <input
            id="password"
            type="password"
            autoComplete="password"
            placeholder="Enter your password"
            className="mb-2 mt-2 w-full rounded-md border  bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
            {...register('password')}
          />
        </label>
        {errors?.['password'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={errors?.['password']?.message}
          />
        ) : null}
      </div>
      <button
        className={classNames(
          'mt-6 inline-flex w-full flex-row items-center justify-center self-center rounded-full border border-blue-600 bg-blue-600 py-2 px-20 text-center text-sm font-semibold text-white outline outline-2 outline-offset-2 outline-transparent md:py-2.5 md:text-base',
          {
            // 'cursor-not-allowed': isLoading,
          },
        )}
        type="submit"
        disabled={false}
      >
        {/* {isLoading && <LoadingIcon />} */}
        {/* {isLoading ? 'loading...' : 'submit'} */}
        submit
      </button>
    </form>
  );
};

export default SigninForm;
