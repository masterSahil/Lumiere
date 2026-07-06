import "./globals.css";
import { Suspense } from "react";
import Loader from "./loading";
import connectDB from "@/libs/config";
import Branding from "@/model/branding";

export const metadata = {
  title: "Lumière | Fine Dining & Culinary Excellence",
  description: "Experience the pinnacle of culinary artistry at Lumière. Reserve a table, explore our exclusive menu, and indulge in luxury dining.",
  keywords: "fine dining, restaurant, luxury, culinary, reservations",
  openGraph: {
    title: "Lumière | Fine Dining",
    description: "Experience the pinnacle of culinary artistry at Lumière.",
    url: "https://lumiere.com",
    siteName: "Lumière",
    images: [
      {
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'sonner';
import BrandingProvider from '@/component/BrandingProvider';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let initialBranding = null;
  try {
    await connectDB();
    const rawBranding = await Branding.findOne();
    if (rawBranding) {
      // Serialize mongoose document to plain object
      initialBranding = JSON.parse(JSON.stringify(rawBranding));
    }
  } catch (error) {
    console.error("Failed to fetch branding in layout", error);
  }

  return (
    <html lang="en">
      <body>
        <BrandingProvider initialBranding={initialBranding}>
          <CartProvider>
            <Suspense fallback={<Loader />}>
              {children}
            </Suspense>
          </CartProvider>
        </BrandingProvider>
        
        {/* Themed Toaster matching Lumière aesthetic */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1c1b1c',
              border: '1px solid rgba(132, 204, 22, 0.3)',
              color: '#e5e2e3',
              fontFamily: "'Manrope', sans-serif",
            },
            classNames: {
              toast: 'backdrop-blur-md shadow-2xl rounded-xl',
              title: 'font-serif text-[16px]',
              description: 'text-[#d0c5af] text-sm',
              success: 'border-[#84cc16] text-[#84cc16]',
              error: 'border-[#ffb4ab] text-[#ffb4ab]',
            },
          }}
        />
      </body>
    </html>
  );
}