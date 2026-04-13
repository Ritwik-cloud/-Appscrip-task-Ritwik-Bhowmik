/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;