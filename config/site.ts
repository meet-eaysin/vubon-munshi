import {
  ChartSplineIcon,
  LifeBuoyIcon,
  PaletteIcon,
  ShieldCheckIcon,
  WaypointsIcon,
  ZapIcon,
} from "lucide-react";

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
  FOOTER_LINKS: [
    {
      title: "Product",
      links: [
        { name: "Home", href: "/" },
        { name: "Features", href: "/" },
        { name: "Pricing", href: "/" },
        { name: "Contact", href: "/" },
        { name: "Download", href: "/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Help Center", href: "/help-center" },
        { name: "Community", href: "/community" },
        { name: "Guides", href: "/guides" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
    {
      title: "Developers",
      links: [
        { name: "API Docs", href: "/api-docs" },
        { name: "SDKs", href: "/sdks" },
        { name: "Tools", href: "/tools" },
        { name: "Open Source", href: "/open-source" },
        { name: "Changelog", href: "/changelog" },
      ],
    },
  ],
  PERKS: [
    {
      icon: ZapIcon,
      title: "Fast and Efficient",
      description:
        "Experience quick and seamless content creation with our optimized AI tools.",
    },
    {
      icon: ChartSplineIcon,
      title: "Insightful Analytics",
      description:
        "Gain valuable insights and analytics to enhance your social media strategy.",
    },
    {
      icon: LifeBuoyIcon,
      title: "24/7 Support",
      description:
        "Our team is available around the clock to assist with any issues or questions.",
    },
    {
      icon: PaletteIcon,
      title: "Customizable Solutions",
      description:
        "Tailor the tools and features to fit your unique social media needs.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure and Reliable",
      description:
        "Trust our platform to keep your data safe and ensure consistent performance.",
    },
    {
      icon: WaypointsIcon,
      title: "Seamless Integration",
      description:
        "Easily integrate with your existing social media platforms and tools.",
    },
  ],
  ctaSection: {
    id: "cta",
    title: "Ready to Master Your Money?",
    subtitle: "Join thousands taking control of their finances",
    backgroundImage: "/cta-background.png",
    button: {
      text: "Get Started",
      href: "/waitlist",
    },
    subtext: "Free forever plan available • No credit card needed",
  },
};

type SiteConfig = typeof siteConfig;
export type { SiteConfig };
