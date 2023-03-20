/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  typescript: {
    // Enable type checking during production build.
    // (This can increase build time but catches errors early.)
    // Recommended to set this to true in production.
    // See: https://nextjs.org/docs/basic-features/typescript#typescript-checking
    ignoreBuildErrors: false,
  },
}
