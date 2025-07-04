import React from 'react'
import AuthenticatedLayout from '../components/Layout/AuthenticatedLayout'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthenticatedLayout>
            {children}
        </AuthenticatedLayout>
    )
}