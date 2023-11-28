import { useState } from 'react';

interface IField {
    id: number;
    label: string;
    key: string;
    value: string;
    getErrorMessage?: (data: Record<string, string>) => string;
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
    return { data, focus, onBlur, onChange, validation };
};

export default useForm;
