import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";
import NavigationBar from "@/components/Navbar";
import StoreProvider from "../StoreProvider";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <StoreProvider>
            <NavigationBar />
            {children}
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
