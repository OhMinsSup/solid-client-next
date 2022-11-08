const IS_DEPLOY_GROUP_PROD =
  process.env.NEXT_PUBLIC_DEPLOY_GROUP === 'production';
const IS_DEPLOY_GROUP_DEV =
  process.env.NEXT_PUBLIC_DEPLOY_GROUP === 'development';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const config = {
  apiHost: API_HOST,
  siteUrl: SITE_URL,
  isDeployGroupProd: IS_DEPLOY_GROUP_PROD,
  isDeployGroupDev: IS_DEPLOY_GROUP_DEV,
};
