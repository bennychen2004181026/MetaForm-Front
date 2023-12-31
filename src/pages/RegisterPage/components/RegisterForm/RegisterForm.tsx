import React, { useEffect } from 'react';

import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

import StyledButton from '@/components/Button';
import ReusableForm from '@/components/ReusableForm';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import { ApiError } from '@/interfaces/ApiError';
import { ICreateUserResponse, IUser, Role } from '@/interfaces/User.interface';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import userApis from '@/services/Auth/user';
import { setCredentials } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const RegisterForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const showSnackbar = useSnackbarHelper();
    const dispatch = useAppDispatch();
    // Former page delivers with email, username in the location.state
    const { email, username } = location.state || {};

    useEffect(() => {
        if (!email || !username) {
            showSnackbar(`Missing necessary state, please re verify your email`, 'error');
            navigate('/register-email');
        }
    }, [email, username]);

    const formFields: IField[] = [
        {
            id: 1,
            label: 'First Name',
            key: 'firstName',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'First name' },
                { key: 'validateName', additionalData: 'First name' },
            ],
        },
        {
            id: 2,
            label: 'Last Name',
            key: 'lastName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'validateName', additionalData: 'Last name' }],
        },
        {
            id: 3,
            label: 'Password',
            key: 'password',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Password' },
                { key: 'validatePassword' },
            ],
        },
        {
            id: 4,
            label: 'Confirm Password',
            key: 'confirmPassword',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Confirm Password' },
                { key: 'validateConfirmPassword', additionalData: 'password' },
            ],
        },
        {
            id: 5,
            label: 'Email',
            key: 'email',
            type: 'input',
            value: email,
            validationRules: [],
        },
        {
            id: 6,
            label: 'User name',
            key: 'username',
            type: 'input',
            value: username,
            validationRules: [],
        },
    ];

    const {
        fieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        resetForm,
        isValid,
        validateAllFields,
    } = useForm(formFields);

    const { useCreateUserMutation } = userApis;
    const [createUser, { isLoading }] = useCreateUserMutation();

    const createUserFunction = async () => {
        try {
            const response: ICreateUserResponse = await createUser(fieldsData).unwrap();
            const { message, user, token, isAccountComplete } = response;
            const { email: responseEmail, role, company, _id, isActive } = user as IUser;
            dispatch(
                setCredentials({
                    user: user as IUser,
                    token,
                    email: responseEmail ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: _id ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );
            showSnackbar(`${message}`, 'success');
            navigate(`/company-profile/${_id}`);
        } catch (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await createUserFunction();
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
            }}
        >
            <ReusableForm
                excludeFields={['email', 'username']}
                formFields={formFields}
                fieldsData={fieldsData}
                fieldsFocus={fieldsFocus}
                errors={errors}
                onDataChange={onDataChange}
                onFieldsBlur={onFieldsBlur}
                isValid={isValid}
                handleSubmit={handleSubmit}
            >
                <StyledButton
                    type="button"
                    onClick={resetForm}
                    variant="contained"
                    color="secondary"
                >
                    Reset
                </StyledButton>
            </ReusableForm>
        </Box>
    );
};

export default RegisterForm;
