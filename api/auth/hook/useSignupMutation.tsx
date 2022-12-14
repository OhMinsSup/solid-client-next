import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

// api
import { signupApi } from '@api/auth/auth';

// hooks
import { MUTATION_KEY } from '@constants/constants';

// types
import type { SignupBody } from '@api/schema/body';
import type { AppAPI } from '@api/schema/api';
import type { AuthRespSchema } from '@api/schema/resp';

interface ReturnValue {
  result: AppAPI<AuthRespSchema>;
}

interface Options
  extends UseMutationOptions<ReturnValue, unknown, SignupBody, unknown> {}

export function useSignupMutation(otp?: Options) {
  return useMutation({
    mutationKey: [MUTATION_KEY.AUTH.SIGNUP],
    mutationFn: (body: SignupBody) => {
      return signupApi(body);
    },
    ...otp,
  });
}
