'use client';

// components/FacebookPixel.tsx
// Facebook Pixel component for Next.js App Router
// Handles pixel initialization and page view tracking

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as fbq from '@/lib/fbpixel';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change
    fbq.pageview();
  }, [pathname, searchParams]);

  return null;
}
