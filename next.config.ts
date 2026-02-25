import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.recipesbynora.com", pathname: "/**" },
      { protocol: "https", hostname: "graceland.ph", pathname: "/**" },
      { protocol: "https", hostname: "hicaps.com.ph", pathname: "/**" },
      { protocol: "https", hostname: "bakewithzoha.com", pathname: "/**" },
      { protocol: "https", hostname: "kusinasecrets.com", pathname: "/**" },
      { protocol: "https", hostname: "salu-salo.com", pathname: "/**" },
      { protocol: "https", hostname: "newgenbaker.com", pathname: "/**" },
      { protocol: "https", hostname: "themayakitchen.com", pathname: "/**" },
      { protocol: "https", hostname: "yummykitchentv.com", pathname: "/**" },
      { protocol: "https", hostname: "curiousflavors.com", pathname: "/**" },
      { protocol: "https", hostname: "panlasangpinoy.com", pathname: "/**" },
      { protocol: "https", hostname: "deliciouslyrushed.com", pathname: "/**" },
      { protocol: "https", hostname: "eatlikepinoy.com", pathname: "/**" },
      { protocol: "https", hostname: "www.latestrecipes.net", pathname: "/**" },
    ],
  },
};

export default nextConfig;
