import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
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
      }
    ];
  },
   devIndicators: false 
};
export default nextConfig;
