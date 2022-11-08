import React from 'react';
import { NextSeo } from 'next-seo';
import { config } from '@constants/env';

export const Title = 'Next.js by Vercel - The React Framework';
export const Description =
  'Production grade React applications that scale. The world’s leading companies use Next.js by Vercel to build static and dynamic websites and web applications.';
export const DefaultImageUrl = '/images/twitter-card.png';
export const Author = 'Vercel';

const SEO_CONSTANTS = {
  title: Title,
  canonical: config.siteUrl,
  description: Description,
  openGraph: {
    url: config.siteUrl,
    title: Title,
    description: Description,
    site_name: Title,
    type: 'website',
    images: [
      {
        url: DefaultImageUrl,
        alt: Title,
      },
    ],
  },
  twitter: {
    handle: `@${Title}`,
    site: `@${Title}`,
    cardType: 'summary_large_image',
  },

  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: '/static/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/static/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/static/favicon/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      href: '/static/favicon/safari-pinned-tab.svg',
    },
    {
      rel: 'manifest',
      href: '/static/favicon/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'author',
      content: Author,
    },
    {
      name: 'msapplication-TileColor',
      content: '#000000',
    },
    {
      name: 'msapplication-config',
      content: '/static/favicon/browserconfig.xml',
    },
    {
      name: 'theme-color',
      content: '#fff',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'Next.js by Vercel, Next.js, Vercel, React, React Framework',
    },
  ],
};

const DefaultSeo = () => {
  return <NextSeo useAppDir {...SEO_CONSTANTS} />;
};

export default DefaultSeo;
