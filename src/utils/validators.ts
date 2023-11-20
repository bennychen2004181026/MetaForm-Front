import { isEmpty } from 'lodash/';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*]).{8,32}$/;

const validators = {
    isRequired: (label: string, value: string) => (!isEmpty(value) ? '' : `Please enter ${label}!`),
    validatePassword: (password: string) =>
        PASSWORD_REGEX.test(password) && !isEmpty(password)
            ? ''
            : 'Password should contain at least one number, one lowercase letter, one uppercase letter and one special character (@,#,$,%,^,_,&,*,!). And 8 to 32 characters long',
    validateConfirmPassword: (password: string, confirmPassword: string) =>
        password === confirmPassword ? '' : 'Password and Confirm Password does not match.',
};

export default validators;
