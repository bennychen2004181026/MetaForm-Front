import { isEmpty } from 'lodash/';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*]).{8,32}$/;

interface Validators {
    isRequired: (args: ValidatorArgs) => string;
    validatePassword: (args: ValidatorArgs) => string;
    validateConfirmPassword: (args: ValidatorArgs) => string;
}

interface GetErrorMessagesProps {
    value: string;
    validationRules: { key: keyof typeof validators; additionalData?: string }[];
    formData: Record<string, string>;
}

interface ValidatorArgs {
    value: string;
    formData: Record<string, string>;
    additionalData?: string;
}

export const validators: Validators = {
    isRequired: ({ value, additionalData }: ValidatorArgs) =>
        !isEmpty(value) ? '' : `Please enter ${additionalData}!`,
    validatePassword: ({ value }: ValidatorArgs) =>
        PASSWORD_REGEX.test(value) && !isEmpty(value)
            ? ''
            : 'at least one number,lowercase and uppercase letter, (@,#,$,%,^,_,&,*,!)and 8 to 32 characters long',
    validateConfirmPassword: ({ value, formData, additionalData }: ValidatorArgs) =>
        value === formData[additionalData as keyof typeof formData]
            ? ''
            : 'Password and Confirm Password does not match.',
};

export const getErrorMessage = ({
    value,
    validationRules,
    formData,
}: GetErrorMessagesProps): string => {
    const error = validationRules.find((rule) => {
        const errorMessage = validators[rule.key]({
            value,
            formData,
            additionalData: rule.additionalData,
        });
        return errorMessage !== '';
    });

    return error
        ? validators[error.key]({ value, formData, additionalData: error.additionalData })
        : '';
};
