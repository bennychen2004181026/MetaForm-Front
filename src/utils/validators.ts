import { isEmpty } from 'lodash/';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*]).{8,32}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const ABN_REGEX = /^\d{11}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{3,26}$/;
interface Validators {
    isRequired: (args: ValidatorArgs) => string;
    validatePassword: (args: ValidatorArgs) => string;
    validateConfirmPassword: (args: ValidatorArgs) => string;
    validateEmail: (args: ValidatorArgs) => string;
    validateABN: (args: ValidatorArgs) => string;
    validateName: (args: ValidatorArgs) => string;
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
            : 'at least one number,lowercase and uppercase letter, (@,#,$,%,^,_,&,*,!)and 8 to 32 characters long',
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
            : `${additionalData} must be 3 to 26 characters long and only allow for a-zA-ZÀ-ÖØ-öø-ÿ, apostrophes, spaces, and hyphens`,
};

export const getErrorMessage = ({
    value,
    validationRules,
    formData,
}: GetErrorMessagesProps): string => {
    let error:
        | {
              key: keyof typeof validators;
              additionalData?: string | undefined;
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
