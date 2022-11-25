// hooks
import { QUERIES_KEY } from '@constants/constants';
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation';

// api
import { signinApi } from '../auth';

export function useSigninMutation(
  otp?: SWRMutationConfiguration<any, any, any>,
) {
  const swrKeyLoader = () => {
    return QUERIES_KEY.AUTH.SIGNIN;
  };
  const mutationFn = (_: string, { arg }: Record<string, any>) => {
    return signinApi(arg);
  };

  return useSWRMutation(swrKeyLoader, mutationFn, otp);
}
