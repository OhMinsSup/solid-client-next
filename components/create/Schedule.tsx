'use client';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { ScheduleIcon, XIcon } from '@components/ui/Icon';

// types
import type { FormFieldValues } from 'app/create/layout';

const Schedule = () => {
  const { watch, setValue, register } = useFormContext<FormFieldValues>();

  const hasPublishedTime = watch('hasPublishedTime', false);

  const onRemoveSchedule = useCallback(() => {
    const options = {
      shouldDirty: true,
      shouldTouch: true,
    };

    setValue('hasPublishedTime', false, options);
    setValue('publishingDate', undefined, options);
  }, [setValue]);

  const onSetSchedule = useCallback(() => {
    setValue('hasPublishedTime', true, {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">
        Schedule your article
      </h3>
      <p className="mb-2 text-gray-500">
        Select a publishing date/time (Based on your local time zone)
      </p>
      <div className="relative">
        {hasPublishedTime ? (
          <div className="flex w-full flex-row items-center justify-between rounded-lg border bg-gray-50 p-4 text-base text-gray-900 outline-none">
            <input
              type="datetime-local"
              className="flex-1 bg-gray-50"
              {...register('publishingDate', { valueAsDate: true })}
            />
            <button
              className="mr-2 ml-2 flex flex-row items-center justify-center rounded-full border border-transparent py-1 px-3 text-center text-base font-medium text-gray-700 outline-none"
              onClick={onRemoveSchedule}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </button>
          </div>
        ) : (
          <button
            onClick={onSetSchedule}
            className=" inline-flex flex-row items-center justify-center rounded-full border border-gray-200 p-2 text-center text-base font-medium text-gray-700 outline-none"
          >
            <ScheduleIcon className="mr-2 h-5 w-5 fill-current" />
            <span>Select a date</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Schedule;
