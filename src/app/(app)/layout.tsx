import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "../providers";
import NavigationBar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import AuthProviderWrapper from "@/context/AuthProviderWrapper";
import { ReduxProvider } from "../ReduxProvider";

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
        <ReduxProvider>
          <NavigationBar />
          {children}
          <Footer />
        </ReduxProvider>
        </AuthProviderWrapper>
      </Providers>
    </div>
  );
}
