// app/context/AuthProviderWrapper.tsx
'use client';
import AuthProvider from "./AuthProvider";

 // This is important to ensure it's a client-side component


export default function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
