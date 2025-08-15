'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';
import AuthLayout from '@/components/Auth/AuthLayout';
import AuthForm from '@/components/Auth/AuthForm';
import Pic from '@/public/product8.png';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get('next') || '/';

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
        <AuthLayout imageSrc={Pic}>
            <AuthForm
                title="Welcome Back"
                fields={[
                    {
                        name: 'email',
                        type: 'text',
                        placeholder: 'Email',
                        icon: <FiMail />,
                        value: email,
                        onChange: setEmail,
                    },
                    {
                        name: 'password',
                        type: 'password',
                        placeholder: 'Password',
                        icon: <FiLock />,
                        value: password,
                        onChange: setPassword,
                    },
                ]}
                onSubmit={handle}
                submitLabel="Login"
                error={error}
                redirectText="Don’t have an account?"
                redirectHref="/auth/register"
            />
        </AuthLayout>
    );
}
