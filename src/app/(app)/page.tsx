'use client'
import { useEffect, useState } from "react";
import StoreProvider from "../StoreProvider";
import { useAppSelector } from "@/lib/hooks";
import authServices from "../appwrite/auth";
import HomePage from "@/components/Pages/HomePage";


export default function Home() {

  return (

    <div>
      <HomePage/>
    </div>

  );
}
