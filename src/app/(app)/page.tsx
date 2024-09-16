'use client'
import HomePage from "@/components/Pages/HomePage";
import ReduxProvider from "../ReduxProvider";


export default function Home() {

  return (
    <ReduxProvider>
      <HomePage/>
    </ReduxProvider>
  );
}
