/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? '/grid/' : '',
  basePath: isProd ? '/grid' : '',
  trailingSlash: true,
  };
  

export default nextConfig;
