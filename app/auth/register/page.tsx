'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handle = (e: React.FormEvent) => {
        e.preventDefault();
        const res = register(name, email, password);
        if (!res.ok) {
            setError(res.error ?? 'Something went wrong');
            return;
        }
        router.push('/');
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <form onSubmit={handle} className="space-y-3">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border rounded" />
                <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
                <button className="w-full bg-green-600 text-white px-3 py-2 rounded">Register</button>
            </form>
        </div>
    );
}
