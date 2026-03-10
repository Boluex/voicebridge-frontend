/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: { domains: ['res.cloudinary.com', 'ui-avatars.com'] },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  },
};
module.exports = nextConfig;
