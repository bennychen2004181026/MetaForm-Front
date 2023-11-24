import { isEmpty } from 'lodash';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const UserRegisterFormValidator = {
    validEmail: (email: string) =>
        EMAIL_REGEX.test(email) && !isEmpty(email) ? '' : 'Please enter the valid email',

    validPassword: (password: string) =>
        PASSWORD_REGEX.test(password) && !isEmpty(password)
            ? ''
            : 'Please entry the valid password(1special, 1number)',
    isRequired: (label: string, value: string) => (!isEmpty(value) ? '' : `Please enter ${label}`),
};

export default UserRegisterFormValidator;
