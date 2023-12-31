import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import InformativeText from '@/components/InformativeText/index';
import { ApiError } from '@/interfaces/ApiError';
import { IVerifyEmailResponse } from '@/interfaces/User.interface';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import MainLayout from '@/layouts/MainLayout';
import userApis from '@/services/Auth/user';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const EmailVerificationPage: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const location = useLocation();
    const navigate = useNavigate();
    const { useVerifyEmailMutation } = userApis;
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
    const { email: emailData, username } = location.state || {};

    useEffect(() => {
        if (!emailData || !username) {
            showSnackbar(`Missing necessary state`, 'error');
            navigate(-1);
        }
    }, [emailData, username]);

    const handleEmailClick = () => {
        showSnackbar('Please log in to your email account to verify your email.', 'info');
    };

    const handleResendEmail = async () => {
        try {
            const response: IVerifyEmailResponse = await verifyEmail({
                email: emailData,
                username,
            }).unwrap();
            const { message } = response;
            showSnackbar(`${message}`, 'success');
        } catch (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };

    const handleChangeEmail = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <MainLayout>
                <InformativeText
                    textBeforeLink="We've sent an email to "
                    link={{ text: emailData || 'Email', onClick: handleEmailClick }}
                    textAfterLink=" to verify your email address and activate your account. The link in the email will expire in 10 minutes."
                />
                <InformativeText
                    textBeforeLink="If you would like to change the email address you can "
                    link={{
                        text: 'click here',
                        onClick: handleChangeEmail,
                    }}
                />
                <InformativeText
                    textBeforeLink=""
                    link={{
                        text: 'Resend email',
                        onClick: handleResendEmail,
                    }}
                    textAfterLink=" if you didn't receive it."
                />
            </MainLayout>
        </div>
    );
};

export default EmailVerificationPage;
