'use client';
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardComponent = () => {
    const { user, currentUserData, profileAvatar, loader, handleLogout } = useUser();

    return (
        <div className="max-w-6xl mx-auto">
            <div>
                <div>Your Blogs</div>
                <div></div>
            </div>
        </div>
    );
};

export default DashboardComponent;