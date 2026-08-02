import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React'in <ViewTransition> bileşenini etkinleştirir; rota geçişlerinde
    // tarayıcının View Transitions API'si devreye girer.
    viewTransition: true,
  },
};

export default nextConfig;
