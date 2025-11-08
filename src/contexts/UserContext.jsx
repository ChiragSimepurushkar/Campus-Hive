// ...existing code...
import React, { createContext, useState, useEffect, useRef } from 'react';
import { auth } from '../Auth/auth.jsx'; // ensure services/api exports `auth` (named) or adjust as needed
import { useAuth } from '../hooks/useAuth.jsx'; // ensure hook export matches (named vs default)

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const mountedRef = useRef(true);

    // call hook (if useAuth is a hook that returns an object with isAuthenticated)
    const authHook = useAuth ? useAuth() : {};
    const isAuthenticated = Boolean(authHook?.isAuthenticated);

    const safeCall = async (fn, ...args) => {
        if (typeof fn !== 'function') {
            console.warn('Attempted to call missing function:', fn);
            return null;
        }
        return fn(...args);
    };

    const fetchUserProfile = async () => {
        if (!isAuthenticated) {
            if (mountedRef.current) {
                setCurrentUser(null);
                setLoadingUser(false);
            }
            return;
        }

        if (mountedRef.current) setLoadingUser(true);

        try {
            // use optional chaining in case auth or method is undefined
            const response = await safeCall(auth?.getProfile);
            const data = response?.data ?? response ?? null;
            if (mountedRef.current) setCurrentUser(data);
            return data;
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            if (mountedRef.current) setCurrentUser(null);
            throw error;
        } finally {
            if (mountedRef.current) setLoadingUser(false);
        }
    };

    const updateUserProfile = async (data) => {
        try {
            const response = await safeCall(auth?.updateProfile, data);
            const updated = response?.data ?? response ?? null;
            if (mountedRef.current) setCurrentUser(updated);
            return updated;
        } catch (error) {
            console.error('Failed to update user profile:', error);
            throw error;
        }
    };

    useEffect(() => {
        mountedRef.current = true;
        fetchUserProfile();
        return () => {
            mountedRef.current = false;
        };
    }, [isAuthenticated]);

    const value = {
        currentUser,
        loadingUser,
        updateUserProfile,
        fetchUserProfile,
        clearUser: () => setCurrentUser(null),
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};