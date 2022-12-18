'use client';

import React, { useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaNext } from '@libs/validation/schema';

import WriterHeader from '@components/create/WriterHeader';
import WriteTemplate from '@components/create/WriteTemplate';

// types
import type { FileSchema } from '@api/schema/file';

export interface FormFieldValues {
  title: string;
  subTitle?: string;
  description: string;
  content: string;
  thumbnail: Omit<FileSchema, 'createdAt' | 'updatedAt' | 'deletedAt'> | null;
  tags?: string[];
  disabledComment: boolean;
  isPublic: boolean;
  hasPublishedTime: boolean;
  publishingDate?: Date;
}

export default function CreateStoryLayout({
  children,
}: React.PropsWithChildren<any>) {
  const intialValues: FormFieldValues = useMemo(() => {
    return {
      title: '',
      subTitle: undefined,
      description: '',
      content: '',
      thumbnail: null,
      tags: undefined,
      disabledComment: false,
      isPublic: false,
      hasPublishedTime: false,
      publishingDate: undefined,
    };
  }, []);

  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schemaNext.write),
    defaultValues: intialValues,
  });

  return (
    <FormProvider {...methods}>
      <WriteTemplate header={<WriterHeader />}>{children}</WriteTemplate>
    </FormProvider>
  );
}
