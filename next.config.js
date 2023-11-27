/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/admin/person",
        destination: "/admin/persons",
        permanent: true,
      },
      {
        source: "/admin/site",
        destination: "/admin/sites",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
