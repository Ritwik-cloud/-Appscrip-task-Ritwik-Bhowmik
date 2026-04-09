/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Standard Next.js config uses remotePatterns for safety
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '**', 
      },
    ],
  },
};

export default nextConfig;