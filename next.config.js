/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chdcityhospital.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
    ]
  }
};

module.exports = nextConfig;
