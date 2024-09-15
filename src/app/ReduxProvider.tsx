'use client';

import { Provider } from "react-redux";
import store from "@/store/Store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}