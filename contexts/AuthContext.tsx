'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

type AuthContextValue = {
    user: User | null;
    register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
    login: (email: string, password: string) => { ok: boolean; error?: string };
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = 'demo_users_v1';
const SESSION_KEY = 'demo_session_v1';

function readUsers(): User[] {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeUsers(u: User[]) {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(u));
    } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (raw) {
                setUser(JSON.parse(raw));
            }
        } catch {}
    }, []);

    const register = (name: string, email: string, password: string) => {
        const users = readUsers();
        if (users.find((u) => u.email === email)) {
            return { ok: false, error: 'Email already registered' };
        }
        const newUser: User = { id: 'u' + Date.now(), name, email, password };
        users.push(newUser);
        writeUsers(users);
        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return { ok: true };
    };

    const login = (email: string, password: string) => {
        const users = readUsers();
        const found = users.find((u) => u.email === email && u.password === password);
        if (!found) return { ok: false, error: 'Invalid credentials' };
        localStorage.setItem(SESSION_KEY, JSON.stringify(found));
        setUser(found);
        return { ok: true };
    };

    const logout = () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
    };

    const value: AuthContextValue = {
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
