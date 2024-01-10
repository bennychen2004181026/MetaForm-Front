import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { Alert, Box, Chip, IconButton, TextareaAutosize, Typography } from '@mui/material/';
import styled from 'styled-components';

import StartIconButton from '@/components/StartIconButton';
import userInviteEmployees from '@/hooks/userInviteEmployees';

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
    } = userInviteEmployees();

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
                <StartIconButton text="Send" startIcon={<EmailIcon />} variant="contained" />
            </StyledStartIconButtonBox>
        </StyledInviteEmployeesBox>
    );
};

export default InviteUsers;
