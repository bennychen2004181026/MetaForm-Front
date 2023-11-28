import { isEmpty } from 'lodash';

const ABN_REGEX = /^(\d *?){11}$/;
const CompanyRegisterFormValidator = {
    isRequired: (label: string, value: string) => (!isEmpty(value) ? '' : `Please enter ${label}`),
    validABN: (abn: string) =>
        ABN_REGEX.test(abn) && !isEmpty(abn) ? '' : 'ABN should be an 11 digits number',
};

export default CompanyRegisterFormValidator;
