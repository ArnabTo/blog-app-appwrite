'use client'
import authServices from "@/app/appwrite/auth";
import { Children, createContext, useEffect, useState } from "react";

interface AuthContextType {
    userStatus: boolean;
    authStatus: boolean;
    setAuthStatus: (value: boolean) => void;
    isLoading: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    userStatus: false,
    authStatus: false,
    setAuthStatus: () => { },
    isLoading: true,
    logout: () => { },
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [userStatus, setUserStatus] = useState<any | null>(null);
    const [authStatus, setAuthStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const authCheck = async () => {
            try {
                const authStatus = await authServices.userStatus();
                if (authStatus) {
                    setUserStatus(authStatus);
                    setAuthStatus(true);
                }
            } catch (error) {
                setAuthStatus(false);
            } finally {
                setIsLoading(false);
            }
        }
        authCheck();
    },[])

const logout = async () => {
    await authServices.logOut();
    setAuthStatus(false);
    setUserStatus(null);
}

    const authFunc = { authStatus, setAuthStatus, userStatus, isLoading, logout  };
    return (
        <AuthContext.Provider value={authFunc}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;