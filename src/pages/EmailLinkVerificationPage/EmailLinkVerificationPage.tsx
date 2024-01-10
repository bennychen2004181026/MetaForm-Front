import React from 'react';

import { useParams } from 'react-router-dom';

import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import EmailLinkVerificationMain from '@/pages/EmailLinkVerificationPage/components/EmailLinkVerificationMain';

const EmailLinkVerificationPage = () => {
    const { token } = useParams<{ token?: string }>();
    return (
        <div>
            <Header />
            <MainLayout>
                <EmailLinkVerificationMain token={token} />
            </MainLayout>
        </div>
    );
};

export default EmailLinkVerificationPage;
