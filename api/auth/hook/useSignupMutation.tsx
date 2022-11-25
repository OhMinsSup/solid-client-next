// hooks
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation';

// api
import { signupApi } from '../auth';

// constants
import { QUERIES_KEY } from '@constants/constants';

export function useSignupMutation(
  otp?: SWRMutationConfiguration<any, any, any>,
) {
  const swrKeyLoader = () => {
    return QUERIES_KEY.AUTH.SIGNUP;
  };
  const mutationFn = (_: string, { arg }: Record<string, any>) => {
    return signupApi(arg);
  };

  return useSWRMutation(swrKeyLoader, mutationFn, otp);
}
