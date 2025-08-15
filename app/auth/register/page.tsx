'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import AuthLayout from '@/components/Auth/AuthLayout';
import AuthForm from '@/components/Auth/AuthForm';
import Pic from '@/public/product8.png';

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
        <AuthLayout imageSrc={Pic}>
            <AuthForm
                title="Create Account"
                fields={[
                    {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Full Name',
                        icon: <FiUser />,
                        value: name,
                        onChange: setName,
                    },
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
                submitLabel="Register"
                error={error}
                redirectText="Already have an account?"
                redirectHref="/auth/login"
            />
        </AuthLayout>
    );
}
