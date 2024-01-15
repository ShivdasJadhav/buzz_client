/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://buzz-server-bjlksw4z0-shivdasjadhav.vercel.app/:path*',
        },
      ]
    },
};
