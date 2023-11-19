import React from 'react';

import { useSnackbar } from 'notistack';

import InformativeText from '@/components/InformativeText/index';
import MainLayout from '@/layouts/MainLayout';

interface EmailVerificationPageProps {
    email: string;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ email }) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleEmailClick = () => {
        enqueueSnackbar('Please log in to your email account to verify your email.', {
            variant: 'info',
        });
    };

    const handleResendEmail = () => {
        // Logic to resend the verification email
        enqueueSnackbar('Resend email logic triggered', {
            variant: 'info',
        });
    };

    const handleChangeEmail = () => {
        // Logic to navigate back to the previous page to change the email
        enqueueSnackbar('Page will direct to the former page', {
            variant: 'info',
        });
    };

    return (
        <MainLayout>
            <InformativeText
                textBeforeLink="We've sent an email to "
                link={{ text: email, onClick: handleEmailClick, className: 'email-link' }}
                textAfterLink=" to verify your email address and activate your account. The link in the email will expire in 10 minutes."
            />
            <InformativeText
                textBeforeLink="If you would like to change the email address you can "
                link={{
                    text: 'click here',
                    onClick: handleChangeEmail,
                    className: 'change-email-link',
                }}
            />
            <InformativeText
                textBeforeLink=""
                link={{
                    text: 'Resend email',
                    onClick: handleResendEmail,
                    className: 'resend-email-link',
                }}
                textAfterLink=" if you didn't receive it."
            />
        </MainLayout>
    );
};

export default EmailVerificationPage;
