'use client'
import DashboardComponent from '@/components/DashboardComponent';
import { AuthContext } from '@/context/AuthProvider';
import useUser from '@/hooks/useUser';
import { Skeleton, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Dashboard = () => {
    const { user, currentUserData, profileAvatar, loader, handleLogout } = useUser();
    const router = useRouter();

    const { isLoading, authStatus } = useContext(AuthContext);

    if (isLoading) {
        return <div className='flex justify-center items-center gap-20 max-w-6xl mx-auto h-screen'>
            <Spinner color="success" />
        </div>
    }

    if (!authStatus) {
        router.push('/sign-in');
    }
    return (
        <div>
            <DashboardComponent></DashboardComponent>
        </div>
    );
};

export default Dashboard;