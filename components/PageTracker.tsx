"use client";

import { trackPageView } from "@/analytics/track";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const pageNameMap: Record<string, string> = {
  "/": "Storefront",
  "/cart": "Cart",
  "/checkout": "Checkout",
  "/success": "Order Success"
};

export const PageTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const pageName = pathname.startsWith("/book/") ? "Product Detail" : pageNameMap[pathname] ?? "Page";

    trackPageView({
      name: "page_view",
      pageName,
      path: pathname,
      source: "web"
    });
  }, [pathname]);

  return null;
};
