import { createContext } from 'react';

const CreateFormContext = createContext({
    handleSubmit: async () => {},
});

export default CreateFormContext;
