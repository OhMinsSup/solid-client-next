'use client';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

interface SidebarNavLinkProps {
  to: string;
  text: string;
  end?: boolean;
  icon?: React.ReactNode;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = (props) => {
  const { to, text, icon, ...resetProps } = props;

  const pathname = usePathname();

  return (
    <Link
      href={to}
      className={classNames('menu-link', {
        active: pathname === to,
      })}
      {...resetProps}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarNavLink;
