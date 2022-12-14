import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

// hooks
import { MUTATION_KEY } from '@constants/constants';

// api
import { signinApi } from '@api/auth/auth';

// types
import type { SigninBody } from '@api/schema/body';
import type { AppAPI } from '@api/schema/api';
import type { AuthRespSchema } from '@api/schema/resp';

interface ReturnValue {
  result: AppAPI<AuthRespSchema>;
}

interface Options
  extends UseMutationOptions<ReturnValue, unknown, SigninBody, unknown> {}

export function useSigninMutation(otp?: Options) {
  return useMutation({
    mutationKey: [MUTATION_KEY.AUTH.SIGNIN],
    mutationFn: (body: SigninBody) => {
      return signinApi(body);
    },
    ...otp,
  });
}
