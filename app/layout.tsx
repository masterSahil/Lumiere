import "./globals.css";

export const metadata = {
  title: "Restaurant Food App",
  description: "The Luxurious Experience",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
