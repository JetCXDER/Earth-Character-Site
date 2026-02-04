// src/utils.js
import {
  Bolt,
  ShoppingBag,
  BookOpenText,
  PanelsTopLeft,
  Users,
  Newspaper,
  Globe,
  Palette,
  LogOut,
  User,
} from "lucide-react";

// Navigation menu data with dropdowns
export const navItems = [
  {
    title: "Home",
    icon: Bolt,
    description: "Go back to the main dashboard",
    href: "/",
    submenu: [
      { title: "Overview", href: "/overview" },
      { title: "Updates", href: "/updates" },
    ],
  },
  {
    title: "Pricing",
    icon: ShoppingBag,
    description: "View subscription plans",
    href: "/pricing",
    submenu: [
      { title: "Basic Plan", href: "/pricing/basic" },
      { title: "Pro Plan", href: "/pricing/pro" },
      { title: "Enterprise", href: "/pricing/enterprise" },
    ],
  },
  {
    title: "About",
    icon: BookOpenText,
    description: "Learn more about EarthApp",
    href: "/about",
    submenu: [
      { title: "Team", href: "/about/team" },
      { title: "Mission", href: "/about/mission" },
    ],
  },
  {
    title: "Settings",
    icon: PanelsTopLeft,
    description: "Customize your experience",
    href: "/settings",
    submenu: [
      { title: "News Settings", icon: Newspaper, href: "/settings/news" },
      { title: "Earth Controls", icon: Globe, href: "/settings/earth" },
      { title: "Theme Options", icon: Palette, href: "/settings/theme" },
    ],
  },
  {
    title: "Account",
    icon: Users,
    description: "Manage your profile",
    href: "/account",
    submenu: [
      { title: "Profile", icon: User, href: "/account/profile" },
      { title: "Logout", icon: LogOut, href: "/account/logout" },
    ],
  },
];
