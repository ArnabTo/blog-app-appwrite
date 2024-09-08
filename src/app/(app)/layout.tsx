import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";
import NavigationBar from "@/components/Shared/Navbar";
import StoreProvider from "../StoreProvider";
import Footer from "@/components/Shared/Footer";
import AuthProviderWrapper from "@/context/AuthProviderWrapper";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Providers>
        <AuthProviderWrapper>
        <StoreProvider>
          <NavigationBar />
          {children}
          <Footer />
        </StoreProvider>
        </AuthProviderWrapper>
      </Providers>
    </div>
  );
}
