'use client';
import React, { useCallback, useEffect, useRef } from 'react';

import { useFormContext } from 'react-hook-form';
import { useInterval } from 'react-use';
import { useWriteStore } from '@store/useWriteStore';

import { TypographyIcon } from '@components/ui/Icon';
import { getTargetElement } from '@libs/browser-utils/dom';

import { useWriteContext } from '../context';

import CoverImage from '@components/create/CoverImage';
import Title from '@components/create/Title';
import SubTitle from '@components/create/SubTitle';
import CoverImagePopover from '@components/create/CoverImagePopover';
import PublishDrawer from '@components/create/PublishDrawer';
import Editor from '@components/ui/Editor/Editor';

import type { FormFieldValues } from '../layout';
import type EditorJS from '@editorjs/editorjs';

function Page() {
  const editorRef = useRef<EditorJS | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { watch, setValue } = useFormContext<FormFieldValues>();

  const { openSubTitle, visible } = useWriteStore();

  const { setEditorJS, editorJS } = useWriteContext();

  const watchThumbnail = watch('thumbnail');

  const onRemoveThumbnail = useCallback(() => {
    setValue('thumbnail', null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue]);

  const syncEditorContent = useCallback(async () => {
    const blocks = await editorJS?.save();
    const data = JSON.stringify(blocks);

    setValue('content', data, {
      shouldDirty: true,
      shouldValidate: true,
    });

    return data;
  }, [editorJS, setValue]);

  const onPublich = useCallback(async () => {
    await syncEditorContent();

    const ele = getTargetElement(formRef);

    ele?.dispatchEvent(
      new Event('submit', {
        cancelable: true,
        bubbles: true,
      }),
    );
  }, [syncEditorContent]);

  return (
    <>
      <form ref={formRef} method="post" className="create-post">
        <div className="relative mb-10 flex flex-row items-center">
          {!watchThumbnail && <CoverImagePopover />}
          <button
            type="button"
            className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
            aria-label="add post sub title"
            aria-haspopup={visible.subTitle ? 'true' : 'false'}
            onClick={openSubTitle}
          >
            <TypographyIcon className="mr-2 h-5 w-5 fill-current" />
            <span>Add Subtitle</span>
          </button>
        </div>
        {watchThumbnail && (
          <CoverImage src={watchThumbnail.url} onRemove={onRemoveThumbnail} />
        )}
        <Title />
        <SubTitle />
        <div className="relative z-20">
          <Editor ref={editorRef} onReady={setEditorJS} />
        </div>
      </form>
      <PublishDrawer onPublich={onPublich} />
    </>
  );
}

export default Page;
