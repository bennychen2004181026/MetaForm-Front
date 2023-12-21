import { isEmpty } from 'lodash/';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*]).{8,32}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const ABN_REGEX = /^\d{11}$/;
const FIRST_NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{3,26}$/;
const validateLastName = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{3,26}$/;
interface Validators {
    isRequired: (args: ValidatorArgs) => string;
    validatePassword: (args: ValidatorArgs) => string;
    validateConfirmPassword: (args: ValidatorArgs) => string;
    validateEmail: (args: ValidatorArgs) => string;
    validateABN: (args: ValidatorArgs) => string;
    validateFirstName: (args: ValidatorArgs) => string;
    validateLastName: (args: ValidatorArgs) => string;
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
        PASSWORD_REGEX.test(value) && !isEmpty(value)
            ? ''
            : 'at least one number,lowercase and uppercase letter, (@,#,$,%,^,_,&,*,!)and 8 to 32 characters long',
    validateConfirmPassword: ({ value, formData, additionalData }: ValidatorArgs) =>
        value === formData[additionalData as keyof typeof formData]
            ? ''
            : 'Password and Confirm Password does not match.',
    validateEmail: ({ value }: ValidatorArgs) =>
        EMAIL_REGEX.test(value) && !isEmpty(value) ? '' : 'Invalid email format',
    validateABN: ({ value }: ValidatorArgs) =>
        ABN_REGEX.test(value) && !isEmpty(value) ? '' : 'Must be 11 digits',
    validateFirstName: ({ value }: ValidatorArgs) =>
        FIRST_NAME_REGEX.test(value) && !isEmpty(value)
            ? ''
            : 'First name must be 3 to 26 characters long and only allow for a-zA-ZÀ-ÖØ-öø-ÿ, apostrophes, spaces, and hyphens',
    validateLastName: ({ value }: ValidatorArgs) =>
        validateLastName.test(value) && !isEmpty(value)
            ? ''
            : 'First name must be 3 to 26 characters long and only allow for a-zA-ZÀ-ÖØ-öø-ÿ, apostrophes, spaces, and hyphens',
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
