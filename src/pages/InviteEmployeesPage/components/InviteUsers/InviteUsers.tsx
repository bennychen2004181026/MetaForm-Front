import React, { useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { Alert, Box, Chip, IconButton, TextareaAutosize, Typography } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StartIconButton from '@/components/StartIconButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import userInviteEmployees from '@/hooks/userInviteEmployees';
import { ApiError } from '@/interfaces/ApiError';
import { IInviteEmployeesResponse } from '@/interfaces/ICompany';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import companyApis from '@/services/company';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import { myCompanyId } from '@/store/slices/company/companySlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledStartIconButtonBox = styled(Box)`
    margin: 100px 0;
`;

const StyledInviteEmployeesBox = styled(Box)`
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

const StyledEmailsInputsBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    position: relative;
`;

const StyledIconButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 18.5px 14px;
    margin: 8px 0;
    font-size: 16px;
    box-sizing: border-box;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    &:focus {
        outline: 2px solid #3f51b5;
    }
`;

const StyledValidEmailsBox = styled(Box)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0 0 20px;
`;

const InviteUsers = () => {
    const showSnackbar = useSnackbarHelper();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const companyId: string = useAppSelector(myCompanyId);
    const { useInviteEmployeesMutation } = companyApis;
    const [invite, { isLoading }] = useInviteEmployeesMutation();

    useEffect(() => {
        if (!companyId) {
            showSnackbar(`Miss company info and you need to re-login`, 'error');
            dispatch(companySliceExports.clearCompanyInfo());
            dispatch(authSliceExports.clearCredentials());
            navigate('/login');
        }
    }, [companyId]);

    const {
        emails,
        emailInput,
        error,
        handleInputChange,
        handleKeyDown,
        handleDelete,
        handleBlur,
        handleFocus,
        handleClearAll,
        isAllEmailsValid,
    } = userInviteEmployees();

    const handleSubmit = async (): Promise<void> => {
        try {
            const response: IInviteEmployeesResponse = await invite({ companyId, emails }).unwrap();
            const { message, failedEmailAddresses } = response;

            if (failedEmailAddresses && failedEmailAddresses.length > 0) {
                const failedEmails = failedEmailAddresses.join(', ');
                showSnackbar(`${message}\n Failed emails: ${failedEmails}`, 'success');
            } else {
                showSnackbar(`${message}`, 'success');
            }
        } catch (submitError) {
            const apiError = submitError as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message ?? apiError.data ?? 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <StyledInviteEmployeesBox>
            <Typography variant="h5" gutterBottom>
                Invite employees to Metafom
            </Typography>
            <Typography variant="body1" gutterBottom>
                Invite teammates to collaborate and create form in your organization. We&lsquo;ll
                employees to enter their personal details when they sign up within company.
            </Typography>
            <StyledEmailsInputsBox>
                <StyledTextArea
                    aria-label="Email addresses"
                    placeholder="Invite by email address..."
                    value={emailInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    minRows={2}
                />
                <StyledIconButton onClick={handleClearAll}>
                    <CloseIcon />
                </StyledIconButton>
            </StyledEmailsInputsBox>
            {error && <Alert severity="error">{error}</Alert>}
            <StyledValidEmailsBox>
                {emails.map((email) => (
                    <Chip key={email} label={email} onDelete={handleDelete(email)} />
                ))}
            </StyledValidEmailsBox>

            <StyledStartIconButtonBox>
                <StartIconButton
                    text="Send"
                    startIcon={<EmailIcon />}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isAllEmailsValid}
                />
            </StyledStartIconButtonBox>
        </StyledInviteEmployeesBox>
    );
};

export default InviteUsers;
