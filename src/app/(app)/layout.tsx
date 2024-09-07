import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";
import NavigationBar from "@/components/Shared/Navbar";
import StoreProvider from "../StoreProvider";
import Footer from "@/components/Shared/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Providers>
        <StoreProvider>
          <NavigationBar />
          {children}
        <Footer/>
        </StoreProvider>
      </Providers>
    </div>
  );
}
