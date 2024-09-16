// 'use client';

// import { Provider } from "react-redux";
// import store from "@/store/Store";

// export function ReduxProvider({ children }: { children: React.ReactNode }) {
//     return <Provider store={store}>{children}</Provider>;
// }

'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/store/Store'


export default function ReduxProvider({children,}: {children: React.ReactNode}) {
    const store = makeStore();
    return <Provider store={store}>{children}</Provider>
}