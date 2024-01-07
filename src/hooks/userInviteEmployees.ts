import React, { useCallback, useMemo, useState } from 'react';

const userInviteEmployees = () => {
    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = useCallback((email: string) => {
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailPattern.test(email);
    }, []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError('');
        const input = event.target.value.replace(/^ +/, '').replace(/,|，/g, ',');
        setEmailInput(input);
    }, []);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (['Enter', 'Tab', ','].includes(event.key)) {
                event.preventDefault();

                const trimmedInput = emailInput.endsWith(',')
                    ? emailInput.slice(0, -1)
                    : emailInput;

                const newEmails = trimmedInput
                    .split(',')
                    .map((email) => email.trim())
                    .filter((email) => email && isValidEmail(email));

                if (newEmails.length > 0) {
                    setEmails((prevEmails) => [...new Set([...prevEmails, ...newEmails])]);
                    setEmailInput('');
                    setError('');
                }
                setError('One or more email addresses entered are in an invalid format');
            }
        },
        [emailInput, isValidEmail],
    );

    const handleDelete = useCallback(
        (emailToDelete: string) => {
            return () => {
                setEmails(emails.filter((email) => email !== emailToDelete));
            };
        },
        [emails],
    );

    const handleBlur = useCallback(() => {
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
    }, [emailInput, isValidEmail]);

    const handleFocus = useCallback(() => {
        setError('');
    }, []);

    const handleClearAll = useCallback(() => {
        setEmails([]);
        setEmailInput('');
        setError('');
    }, []);

    const isAllEmailsValid = useMemo(() => {
        return emails.length > 0 && emails.every((email) => isValidEmail(email));
    }, [emails, isValidEmail]);

    return {
        emails,
        setEmails,
        emailInput,
        setEmailInput,
        error,
        setError,
        handleInputChange,
        handleKeyDown,
        handleDelete,
        handleBlur,
        handleFocus,
        handleClearAll,
        isAllEmailsValid,
    };
};

export default userInviteEmployees;
