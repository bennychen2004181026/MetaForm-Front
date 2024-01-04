import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { Alert, Box, Chip, IconButton, TextareaAutosize, Typography } from '@mui/material/';
import styled from 'styled-components';

import StartIconButton from '@/components/StartIconButton';

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
    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError('');

        const input = event.target.value.replace(/^ +/, '').replace(/,|，/g, ',');
        setEmailInput(input);

        const trimmedInput = input.endsWith(',') ? input.slice(0, -1) : input;

        const emailHolders = trimmedInput.split(',');
        const invalidEmails = emailHolders.filter((email) => email && !isValidEmail(email.trim()));

        if (invalidEmails.length > 0) {
            setError('One or more email addresses entered are in an invalid format');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (['Enter', 'Tab', ','].includes(event.key)) {
            event.preventDefault();

            const trimmedInput = emailInput.endsWith(',') ? emailInput.slice(0, -1) : emailInput;

            const newEmails = trimmedInput
                .split(',')
                .map((email) => email.trim())
                .filter((email) => email && isValidEmail(email));

            if (newEmails.length > 0) {
                setEmails((prevEmails) => [...new Set([...prevEmails, ...newEmails])]);
                setEmailInput('');
            } else if (trimmedInput) {
                setError('Email address entered is in an invalid format');
            }
        } else if (event.key === 'Backspace' && !emailInput) {
            setEmails((prevEmails) => prevEmails.slice(0, -1));
        }
    };

    const removeEmail = (index: number): void => {
        setEmails(emails.filter((email, i) => i !== index));
    };

    const handleDelete = (emailToDelete: string): (() => void) => {
        return () => {
            removeEmail(emails.indexOf(emailToDelete));
        };
    };
    const handleBlur = () => {
        setError('');
        const emailCandidates = emailInput
            .split(',')
            .map((email) => email.trim())
            .filter((email) => email);

        const validEmails = emailCandidates.filter((email) => isValidEmail(email));
        const hasInvalidEmails = emailCandidates.length !== validEmails.length;

        if (hasInvalidEmails) {
            setError('One or more email addresses entered are in an invalid format');
        } else {
            setEmails((prevEmails) => [...new Set([...prevEmails, ...validEmails])]);
            setEmailInput('');
        }
    };

    const handleFocus = () => {
        setError('');
    };

    const handleClearAll = () => {
        setEmails([]);
    };

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
