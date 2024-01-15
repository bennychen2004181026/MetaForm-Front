import { isEmpty } from 'lodash/';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*]).{8,32}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const ABN_REGEX = /^\d{11}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{1,26}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{5,20}$/;

interface Validators {
    isRequired: (args: ValidatorArgs) => string;
    validatePassword: (args: ValidatorArgs) => string;
    validateConfirmPassword: (args: ValidatorArgs) => string;
    validateEmail: (args: ValidatorArgs) => string;
    validateABN: (args: ValidatorArgs) => string;
    validateName: (args: ValidatorArgs) => string;
    validateUsername: (args: ValidatorArgs) => string;
}

interface GetErrorMessagesProps {
    value: string;
    validationRules?: { key: keyof typeof validators; additionalData?: string }[];
    formData: Record<string, string>;
}

interface ValidatorArgs {
    value: string;
    formData: Record<string, string>;
    additionalData?: string;
}

export const validators: Validators = {
    isRequired: ({ value, additionalData }: ValidatorArgs) =>
        !isEmpty(value.trim()) ? '' : `Please enter ${additionalData}!`,
    validatePassword: ({ value }: ValidatorArgs) =>
        // ensure the empty input identified as no error when it's not required
        isEmpty(value) || (PASSWORD_REGEX.test(value) && !isEmpty(value))
            ? ''
            : 'Please enter a valid password between 8 and 32 characters long, including at least one digit, one lowercase letter, one uppercase letter, and one special character (!@#$%^_&*).',
    validateConfirmPassword: ({ value, formData, additionalData }: ValidatorArgs) =>
        value === formData[additionalData as keyof typeof formData]
            ? ''
            : 'Password and Confirm Password does not match.',
    validateEmail: ({ value }: ValidatorArgs) =>
        isEmpty(value) || (EMAIL_REGEX.test(value) && !isEmpty(value))
            ? ''
            : 'Invalid email format',
    validateABN: ({ value }: ValidatorArgs) =>
        isEmpty(value) || (ABN_REGEX.test(value) && !isEmpty(value)) ? '' : 'Must be 11 digits',
    validateName: ({ value, additionalData }: ValidatorArgs) =>
        isEmpty(value) || (NAME_REGEX.test(value) && !isEmpty(value))
            ? ''
            : `Invalid ${additionalData}. Need 1 to 26 characters, including uppercase and lowercase letters, accented letters, apostrophes, spaces, or hyphens.`,
    validateUsername: ({ value, additionalData }: ValidatorArgs) =>
        isEmpty(value) || (USERNAME_REGEX.test(value) && !isEmpty(value))
            ? ''
            : `Invalid ${additionalData}. Need 5 to 20 characters, including uppercase and lowercase letters, numbers, underscores, periods, or hyphens.`,
};

export const getErrorMessage = ({
    value,
    validationRules,
    formData,
}: GetErrorMessagesProps): string => {
    let error:
        | {
              key: keyof typeof validators;
              additionalData?: string;
          }
        | undefined;
    if (validationRules) {
        error = validationRules.find((rule) => {
            const errorMessage = validators[rule.key]({
                value,
                formData,
                additionalData: rule.additionalData,
            });
            return errorMessage !== '';
        });
    }

    return error
        ? validators[error.key]({ value, formData, additionalData: error.additionalData })
        : '';
};
