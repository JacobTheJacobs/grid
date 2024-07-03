/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/my-nextjs-app/' : '',
    basePath: '/my-nextjs-app',
    trailingSlash: true,
  };
  

export default nextConfig;
