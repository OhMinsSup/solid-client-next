import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

// api
import { imageUploadApi } from '@api/files/files';

// hooks
import { MUTATION_KEY } from '@constants/constants';

// types
import type { UploadBody } from '@api/schema/body';
import type { AppAPI } from '@api/schema/api';
import type { UploadRespSchema } from '@api/schema/resp';

interface ReturnValue {
  result: AppAPI<UploadRespSchema>;
}

interface Options
  extends UseMutationOptions<ReturnValue, unknown, UploadBody, unknown> {}

export function useImageUploadMutation(otp?: Options) {
  return useMutation({
    mutationKey: [MUTATION_KEY.FILE.IMAGE_UPLOAD],
    mutationFn: (body: UploadBody) => {
      return imageUploadApi(body);
    },
    ...otp,
  });
}
