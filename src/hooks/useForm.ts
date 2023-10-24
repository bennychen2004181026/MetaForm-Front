import { useState } from 'react';

export default function useForm() {
    const [inputs, setInputs] = useState<string>();
    return {
        inputs,
        setInputs,
    };
}
