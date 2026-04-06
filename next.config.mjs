/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed ignoreBuildErrors for production stability
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Enabled image optimization for production performance
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
