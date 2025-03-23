import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/app",
      },
      {
        source: "/home",
        destination: "/web/pages/home",
      },
      {
        source: "/login",
        destination: "/web/pages/login",
      },
      {
        source: "/signup",
        destination: "/web/pages/signup",
      },
      {
        source: "/settings",
        destination: "/web/pages/settings",
      },
      {
        source: "/profile",
        destination: "/web/pages/profile/[username]",
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
};

export default nextConfig;
