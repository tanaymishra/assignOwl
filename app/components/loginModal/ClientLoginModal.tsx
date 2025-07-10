'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the login component to avoid SSR issues
const LoginComp = dynamic(() => import('./login'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const ClientLoginModal = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComp />
    </Suspense>
  );
};

export default ClientLoginModal;
