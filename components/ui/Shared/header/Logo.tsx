'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { useButton } from 'react-aria';
import { LogoIcon, MenuIcon } from '@components/ui/Icon';

const Logo = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const { buttonProps, isPressed } = useButton(
    {
      type: 'button',
      elementType: 'button',
      'aria-label': 'menu button',
      'aria-haspopup': 'menu',
      onPressEnd(e) {
        (e.target as unknown as HTMLElement).blur();
      },
    },
    btnRef,
  );

  return (
    <div className="col-span-4 flex flex-row items-center justify-start lg:col-span-2 xl:col-span-2">
      <button
        ref={btnRef}
        {...buttonProps}
        type="button"
        className={classNames(
          'relative rounded-lg px-2 py-1 text-gray-900 hover:bg-gray-200 lg:hidden',
          {
            'focus:border focus:border-dotted': isPressed,
          },
        )}
      >
        <MenuIcon className="h-5 w-5 fill-current" />
      </button>
      <span
        style={{
          WebkitTouchCallout: 'none',
        }}
      >
        <Link href={'/'} className="hidden w-36 md:w-48 lg:block lg:w-full">
          <LogoIcon className="h-full w-full fill-current" />
        </Link>
      </span>
    </div>
  );
};

export default Logo;
