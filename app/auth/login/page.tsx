'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const next: string = searchParams.get('next') || '/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handle = (e: React.FormEvent) => {
        e.preventDefault();
        const res = login(email, password);
        if (!res.ok) {
            setError(res.error ?? 'Something went wrong');
            return;
        }
        router.push(next);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <form onSubmit={handle} className="space-y-3">
                <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded">Login</button>
            </form>
        </div>
    );
}
