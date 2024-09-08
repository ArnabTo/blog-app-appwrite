'use client'
import DashboardComponent from '@/components/DashboardComponent';
import { AuthContext } from '@/context/AuthProvider';
import useUser from '@/hooks/useUser';
import { Skeleton } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Dashboard = () => {
    const { user, currentUserData, profileAvatar, loader, handleLogout } = useUser();
    const router = useRouter();

    const { isLoading, authStatus } = useContext(AuthContext);

    if (isLoading) {
        return <div className='flex justify-center items-center gap-20 max-w-6xl mx-auto h-screen'>
            <Skeleton className="rounded-lg h-1/2 w-full">
                <div className="w-full h-24 rounded-lg bg-red-500">
                    Loading
                </div>
            </Skeleton>
            <Skeleton className="rounded-lg h-1/2 w-full">
                <div className="h-24 rounded-lg bg-green-500">
                    Loading
                </div>
            </Skeleton>
        </div>
    }

    if (!authStatus) {
        router.push('/login');
    }
    return (
        <div className='h-screen'>
            This is userdashboard
            <DashboardComponent></DashboardComponent>
        </div>
    );
};

export default Dashboard;