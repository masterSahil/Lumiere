import "./globals.css";
import { Suspense } from "react";
import Loader from "./loading";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}