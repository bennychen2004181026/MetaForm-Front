import { useCallback, useState } from 'react';

interface IField {
    id: number;
    label: string;
    key: string;
    value: string;
    getErrorMessages: (value: string) => string[]; // Function returning an array of error messages
}

interface FormValues {
    [key: string]: string;
}

const useForm = (fields: IField[]) => {
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

    const [data, setData] = useState<FormValues>(createInitialState());
    const [focus, setFocus] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = useCallback(
        (key: string, value: string) => {
            const field = fields.find((f) => f.key === key);
            const errorMessages = field ? field.getErrorMessages(value) : [];
            setErrors((prev) => ({ ...prev, [key]: errorMessages.join('\n') }));
            return errorMessages.length === 0;
        },
        [fields],
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

export default useForm;
