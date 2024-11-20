"use client";

import { useEffect, useState } from 'react';
import { axiosInstance } from '@refinedev/simple-rest';

interface ClientComponentProps {
    initialUser: any;
}

export const ClientComponent = ({ initialUser }: ClientComponentProps) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        const refreshUser = async () => {
            try {
                const response = await axiosInstance.get('/api/users/currentuser');
                setUser(response.data.currentUser);
            } catch (error) {
                console.error("Client-side fetch error:", error);
            }
        };

        if (!initialUser) {
            refreshUser();
        }
    }, [initialUser]);

    return (
        <div>
            {user ? (
                <div>Welcome, {user.email}</div>
            ) : (
                <div>Please sign in</div>
            )}
        </div>
    );
};