import React, { useState } from 'react';

import { Button, TextField } from '@mui/material';

const AddLinkBox = ({ editor, setModal }) => {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const setlink = () => {
        editor.chain().focus().extendMarkRange('link').setLink({ href: input }).run();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setlink(input);
        setModal(false);
        setInput('');
    };
    return (
        <div>
            <Button color="secondary" onClick={() => setModal(false)}>
                Cancel
            </Button>

            <form
                onSubmit={(e) => handleSubmit(e)}
                type="submit"
                className="flex flex-col gap-1 jcc aic"
            >
                <TextField
                    required
                    id="form-question-title"
                    defaultValue=""
                    variant="outlined"
                    type="text"
                    label="Link to"
                    maxRows={1}
                    onChange={(e) => handleChange(e)}
                />

                <Button variant="contained" color="success" type="submit">
                    Add
                </Button>
            </form>
        </div>
    );
};
export default AddLinkBox;
