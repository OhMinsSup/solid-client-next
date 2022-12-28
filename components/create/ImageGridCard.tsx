'use client';
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { useFormContext } from 'react-hook-form';

// types
import type { FileSchema } from '@api/schema/file';
import type { FormFieldValues } from 'app/create/layout';
import Image from 'next/image';

interface ImageGridCardProps extends Omit<FileSchema, 'deletedAt'> {
  index: number;
}

const ImageGridCard: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ImageGridCardProps
> = (props, ref) => {
  const { ...otherProps } = props;
  const divRef = useRef<HTMLDivElement | null>(null);

  const { setValue } = useFormContext<FormFieldValues>();

  const [isLoading, setLoading] = useState(true);

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => divRef.current,
  );

  const onClickSelect = useCallback(() => {
    setValue('thumbnail', otherProps, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [otherProps, setValue]);

  return (
    <div
      className=" col-span-4 cursor-pointer rounded-lg md:col-span-3"
      ref={divRef}
    >
      <button
        onClick={onClickSelect}
        aria-label="Set unsplash cover image"
        className="w-full overflow-hidden rounded-lg border outline-none"
      >
        <div className="relative pb-[56.25%]">
          <div className="absolute inset-0">
            <Image
              src={props.url}
              alt={props.name}
              fill
              priority={[0, 1, 2, 3, 4, 5].includes(props.index)}
              className={classNames(
                'duration-700 ease-in-out group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0',
              )}
              sizes="(max-width: 640px) 100vw, 640px"
              onLoadingComplete={() => setLoading(false)}
            />
            {/* <img
              src={props.url}
              alt="MacBook Pro, white ceramic mug,and black smartphone on table"
              className="h-full w-full"
            /> */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default React.forwardRef(ImageGridCard);
