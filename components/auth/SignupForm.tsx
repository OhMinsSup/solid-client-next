'use client';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

// hooks
import { useSignupMutation } from '@api/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaNext } from '@libs/validation/schema';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

// validation
import { match, P } from 'ts-pattern';
import { getUserInfoApi } from '@api/user';
import { useAuthStore } from '@store/useAuthStore';

// components
import { LoadingIcon } from '@components/ui/Icon';
import ValidationMessage from '@components/ui/Error/ValidationMessage';

// error
import { FetchError } from '@api/client';

import { PAGE_ENDPOINTS, QUERIES_KEY } from '@constants/constants';

// types
import type { SubmitHandler } from 'react-hook-form';
import type { AppAPI } from '@api/schema/api';
import type { UserRespSchema } from '@api/schema/resp';

interface FormFieldValues {
  username: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const defaultValues: FormFieldValues = useMemo(() => {
    return {
      username: 'veloss',
      email: 'mins5190@naver.com',
      name: 'tester',
      password: '1q2w3e4r!@',
      confirmPassword: '1q2w3e4r!@',
    };
  }, []);

  const [error, setError] = useState<Record<string, string> | null>(null);
  const { setAuth } = useAuthStore();

  const { isLoading, mutate } = useSignupMutation({
    onError: async (err) => {
      if (err instanceof FetchError) {
        const resp = err.response;
        const checkStatusCode = [404, 400] as number[];
        if (checkStatusCode.includes(resp.status)) {
          const data = err.data;
          const errorKey = data.error;
          const state = match(data.message)
            .with(P.array(P.string), (data) => ({
              errors: {
                [errorKey]: data[0],
              },
            }))
            .with(P.string, (data) => ({
              errors: {
                [errorKey]: data,
              },
            }))
            .exhaustive();

          setError(state.errors);
          return;
        }
      }
    },
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: QUERIES_KEY.ME,
        queryFn: () => getUserInfoApi(),
      });

      const data = queryClient.getQueryData<{
        result: AppAPI<UserRespSchema>;
      }>(QUERIES_KEY.ME);

      const profile = data?.result.result;
      if (profile) {
        setAuth(true, profile);
      }

      router.replace(PAGE_ENDPOINTS.ROOT);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFieldValues>({
    resolver: zodResolver(schemaNext.signup),
    reValidateMode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    mutate(input);
  };

  return (
    <form
      method="post"
      className="mb-4 mt-9 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="font-semibold text-black">
          Username
          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            className="mt-2 mb-2 w-full rounded-md border bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
            {...register('username')}
          />
        </label>
        {errors?.['username'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={errors?.['username']?.message}
          />
        ) : null}
        {error?.['username'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={error?.['username']}
          />
        ) : null}
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
        {error?.['email'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={error?.['email']}
          />
        ) : null}
        <label className="font-semibold text-black">
          name
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="mb-2 mt-2 w-full rounded-md border bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
            {...register('name')}
          />
        </label>
        {errors?.['name'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={errors?.['name']?.message}
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
        <label className="font-semibold text-black">
          Confirm Password
          <input
            id="confirmPassword"
            type="password"
            autoComplete="password"
            placeholder="Enter your password"
            className="mb-2 mt-2 w-full rounded-md border bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
            {...register('confirmPassword')}
          />
        </label>
        {errors?.['confirmPassword'] ? (
          <ValidationMessage
            isSubmitting={isSubmitting}
            error={errors?.['confirmPassword']?.message}
          />
        ) : null}
      </div>
      <button
        className={classNames(
          'mt-6 inline-flex w-full flex-row items-center justify-center self-center rounded-full border border-blue-600 bg-blue-600 py-2 px-20 text-center text-sm font-semibold text-white outline outline-2 outline-offset-2 outline-transparent md:py-2.5 md:text-base',
          {
            'cursor-not-allowed': isLoading,
          },
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading && <LoadingIcon />}
        {isLoading ? 'loading...' : 'submit'}
      </button>
    </form>
  );
};

export default SignupForm;
