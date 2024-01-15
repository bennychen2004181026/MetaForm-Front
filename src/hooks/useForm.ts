import { useCallback, useState } from 'react';

import { getErrorMessage, validators } from '@/utils/validators';

export interface IField {
    id: number;
    label: string;
    key: string;
    type?: 'input' | 'select' | 'file' | 'password' | 'token';
    options?: string[];
    value?: string;
    validationRules?: { key: keyof typeof validators; additionalData?: string }[];
    getErrorMessage?: (data: Record<string, string>) => string;
}

interface FormData {
    [key: string]: string;
}

const useForm = (fields: IField[]) => {
    const initialData = fields.reduce(
        (acc: Record<string, string>, cur) => ({
            ...acc,
            [cur.key as never]: cur.value ?? '',
        }),
        {},
    );

    const initialFocus = fields.reduce(
        (acc: Record<string, string>, cur) => ({
            ...acc,
            [cur.key as never]: false,
        }),
        {},
    );

    const [focus, setFocus] = useState<Record<string, boolean>>(initialFocus);

    const onBlur = (key: string) => () =>
        setFocus((prev) => ({
            ...prev,
            [key]: true,
        }));

    const [data, setData] = useState<Record<string, string>>(initialData);

    const onChange =
        (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target;

            return setData((prev) => ({
                ...prev,
                [key]: value,
            }));
        };

    const validation = () => {
        return Object.keys(fields).every((key) => {
            const field = fields[+key];

            return !field.getErrorMessage?.(data);
        });
    };

    const createInitialState = useCallback(
        () =>
            fields.reduce(
                (acc, field) => ({
                    ...acc,
                    [field.key]: field.value ?? '',
                }),
                {},
            ),
        [fields],
    );

    const [fieldsData, setFieldsData] = useState<FormData>(createInitialState());
    const [fieldsFocus, setFieldsFocus] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = useCallback(
        (key: string, value: string) => {
            const field = fields.find((f) => f.key === key);
            if (field) {
                const errorMessage = getErrorMessage({
                    value,
                    validationRules: field.validationRules,
                    formData: fieldsData,
                });
                setErrors((prev) => ({ ...prev, [key]: errorMessage }));
            }
        },
        [fields, fieldsData],
    );

    const onDataChange = useCallback(
        (
            field: string,
        ): ((
            event: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => void) => {
            return (event) => {
                const value = typeof event === 'string' ? event : event.target.value;
                setFieldsData((prev) => ({ ...prev, [field]: value }));
                if (fieldsFocus[field]) {
                    validateField(field, value);
                }
            };
        },
        [fieldsFocus, validateField, setFieldsData],
    );

    const onFieldsBlur = useCallback(
        (key: string) => (): void => {
            const isFieldEmpty = fieldsData[key] === '';
            setFieldsFocus((prev) => ({ ...prev, [key]: !isFieldEmpty }));
            validateField(key, fieldsData[key]);
        },
        [fieldsData, validateField],
    );

    const resetForm = useCallback((): void => {
        setFieldsData(createInitialState());
        setFieldsFocus({});
        setErrors({});
    }, [createInitialState]);

    const isValid = useCallback(() => {
        return Object.values(errors).every((error) => error === '');
    }, [errors]);

    const validateAllFields = useCallback((): boolean => {
        let areAllFieldsValid = true;
        fields.forEach((field) => {
            const errorMessage = getErrorMessage({
                value: fieldsData[field.key],
                validationRules: field.validationRules,
                formData: fieldsData,
            });
            if (errorMessage) {
                areAllFieldsValid = false;
            }
        });
        return areAllFieldsValid;
    }, [fields, fieldsData]);

    const validateFieldsByStep = useCallback(
        (stepFieldKeys: string[]): boolean => {
            let areFieldsValid = true;

            stepFieldKeys.forEach((key) => {
                const field = fields.find((f) => f.key === key);
                if (field) {
                    const errorMessage = getErrorMessage({
                        value: fieldsData[key],
                        validationRules: field.validationRules,
                        formData: fieldsData,
                    });

                    if (errorMessage) {
                        areFieldsValid = false;
                    }
                }
            });

            return areFieldsValid;
        },
        [fields, fieldsData],
    );

    return {
        data,
        focus,
        onBlur,
        onChange,
        validation,
        fieldsData,
        setFieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        resetForm,
        isValid,
        validateAllFields,
        validateFieldsByStep,
    };
};

export default useForm;
