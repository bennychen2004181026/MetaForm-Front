import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import StartIconButton from '@/components/StartIconButton';

const InviteUsers = () => {
    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <h3>Invite employees to Metafom</h3>
            <p>
                Invite teammates to collaborate and create form in your organization. We&apos;ll ask
                employees to enter their personal details when they sign up within company.
            </p>
            <TextField
                label="Email addresses"
                value={emailInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Invite by email address..."
                helperText="Separate emails using a comma. Note, we can't send invitations to distribution lists."
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                    startAdornment: emails.map((email) => (
                        <Chip key={email} label={email} onDelete={handleDelete(email)} />
                    )),
                    endAdornment: (
                        <IconButton onClick={handleClearAll}>
                            <CloseIcon />
                        </IconButton>
                    ),
                }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <StartIconButton
                text="Confirm"
                disabled={false}
                startIcon={<CropIcon />}
                variant="contained"
            />
        </Box>
    );
};

export default InviteUsers;
