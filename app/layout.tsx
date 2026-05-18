import "./globals.css";
import { Suspense } from "react";
import Loader from "./loading";

export const metadata = {
  title: "Restaurant Food App",
  description: "The Luxurious Experience",
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