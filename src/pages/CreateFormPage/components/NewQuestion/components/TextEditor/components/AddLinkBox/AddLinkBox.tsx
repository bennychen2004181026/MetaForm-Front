import React, { useState } from 'react';

import { Box, Button, IconButton, TextField } from '@mui/material';
import { Editor } from '@tiptap/react';

const AddLinkBox = ({
    editor,
    setModal,
}: {
    editor: Editor;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [input, setInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const setlink = (inputLink: string) => {
        editor.chain().focus().extendMarkRange('link').setLink({ href: inputLink }).run();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setlink(input);
        setModal(false);
        setInput('');
    };
    return (
        <Box>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-1 jcc aic">
                <TextField
                    required
                    id="form-question-title"
                    defaultValue=""
                    variant="outlined"
                    type="text"
                    label="Link to"
                    maxRows={1}
                    onChange={(e) => handleChange}
                />
                <Button color="secondary" onClick={() => setModal(false)}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                    Add
                </Button>
            </form>
        </Box>
    );
};
export default AddLinkBox;
