import React, { useState } from 'react';

import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Editor } from '@tiptap/react';

const AddLinkPopup = ({
    editor,
    open,
    setOpen,
}: {
    editor: Editor;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [input, setInput] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };
    const setlink = (inputLink: string) => {
        editor.chain().focus().extendMarkRange('link').setLink({ href: inputLink }).run();
    };

    const handleSubmit = () => {
        setlink(input);
        setOpen(false);
        setInput('');
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Add Link</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    id="new-link"
                    defaultValue=""
                    variant="outlined"
                    type="text"
                    label="Link to"
                    maxRows={1}
                    onChange={(e) => handleChange(e)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddLinkPopup;
