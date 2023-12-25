import React from 'react';

import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';

const TextOperation = ({ editor }: { editor: Editor }) => {
    return (
        <>
            <IconButton
                title="bold"
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FormatBold />
            </IconButton>
            <IconButton
                title="Italics"
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FormatItalic />
            </IconButton>
            <IconButton
                title="underline"
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FormatUnderlined />
            </IconButton>
        </>
    );
};
export default TextOperation;
