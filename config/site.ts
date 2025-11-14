export const siteConfig = {
  name: "Libra AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://Libra.dev",
  getStartedUrl: "https://Libra.dev",
  ogImage: "https://libra.dev/opengraph-image.png",
  description: "Libra is a platform for building AI-powered applications.",
  links: {
    twitter: "https://twitter.com/nextify2024",
    github: "https://github.com/nextify-limited/libra",
    email: "mailto:contact@libra.dev",
    forum: "https://forum.libra.dev",
  },
};

type SiteConfig = typeof siteConfig;
export type { SiteConfig };
