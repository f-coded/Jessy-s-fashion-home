export type MegaColumn = { title: string; links: { label: string; href: string }[] };
export type NavItem = {
  label: string;
  href: string;
  mega?: MegaColumn[];
  submenu?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    href: "#services",
    mega: [
      {
        title: "Styling by Jenny",
        links: [
          { label: "Personal Styling", href: "#services" },
          { label: "Haute Couture Design", href: "#services" },
          { label: "Artist & Stage Looks", href: "#services" },
          { label: "Event & Bridal Styling", href: "#services" },
        ],
      },
      {
        title: "Material Distribution",
        links: [
          { label: "Fabrics & Textiles", href: "#services" },
          { label: "Ready-to-Wear Supply", href: "#services" },
          { label: "Sewing Machines", href: "#services" },
          { label: "Notions & Accessories", href: "#services" },
        ],
      },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    submenu: [
      { label: "Full Photo Gallery", href: "/gallery" },
      { label: "Selected Looks", href: "/#work" },
      { label: "Showreel", href: "/#showreel" },
    ],
  },
  { label: "Contact", href: "#footer" },
];

export const SOCIALS = [
  { label: "Instagram", key: "instagram" },
  { label: "Facebook", key: "facebook" },
  { label: "TikTok", key: "tiktok" },
  { label: "Pinterest", key: "pinterest" },
  { label: "Youtube", key: "youtube" },
] as const;
