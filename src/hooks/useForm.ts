import { useCallback, useState } from 'react';

import { getErrorMessage, validators } from '@/utils/validators';

export interface IField {
    id: number;
    label: string;
    key: string;
    type: string;
    value?: string;
    validationRules: { key: keyof typeof validators; additionalData?: string }[];
}

interface FormData {
    [key: string]: string;
}

export const useForm = (fields: IField[]) => {
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

    const [data, setData] = useState<FormData>(createInitialState());
    const [focus, setFocus] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = useCallback(
        (key: string, value: string) => {
            const field = fields.find((f) => f.key === key);
            if (field) {
                const errorMessage = getErrorMessage({
                    value,
                    validationRules: field.validationRules,
                    formData: data,
                });
                setErrors((prev) => ({ ...prev, [key]: errorMessage }));
            }
        },
        [fields, data],
    );

    const onChange = useCallback(
        (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setData((prev) => ({ ...prev, [key]: value }));
            if (focus[key]) {
                validateField(key, value);
            }
        },
        [focus, validateField],
    );

    const onBlur = useCallback(
        (key: string) => () => {
            setFocus((prev) => ({ ...prev, [key]: true }));
            validateField(key, data[key]);
        },
        [data, validateField],
    );

    const resetForm = useCallback(() => {
        setData(createInitialState());
        setFocus({});
        setErrors({});
    }, [createInitialState]);

    const isValid = useCallback(() => {
        return Object.values(errors).every((error) => error === '');
    }, [errors]);

    return { data, focus, errors, onChange, onBlur, resetForm, isValid };
};
