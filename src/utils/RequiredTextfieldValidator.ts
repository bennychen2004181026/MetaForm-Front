import { isEmpty } from 'lodash';

const TextfieldValidator = {
    isRequired: (label: string, value: string) => (!isEmpty(value) ? '' : `Please enter ${label}`),
};

export default TextfieldValidator;
