import React from 'react';

import {
    FormatBold,
    FormatClear,
    FormatItalic,
    FormatPaint,
    FormatUnderlined,
} from '@mui/icons-material';
import { Editor } from '@tiptap/react';

const TextOperation = ({ editor }: { editor: Editor }) => {
    return (
        <div className="flex">
            <button
                title="bold"
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FormatBold fontSize="small" />
            </button>
            <button
                title="Italics"
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FormatItalic fontSize="small" />
            </button>
            <button
                title="underline"
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FormatUnderlined fontSize="small" />
            </button>
            <button
                title="unset-all-marks"
                type="button"
                className={editor.isActive('underline') ? 'is-active' : ''}
                onClick={() => editor.commands.toggleHighlight({ color: '#ffcc00' })}
            >
                <FormatPaint fontSize="small" />
            </button>
            <button
                title="unset-all-marks"
                type="button"
                onClick={() => editor.commands.unsetAllMarks()}
            >
                <FormatClear fontSize="small" />
            </button>
        </div>
    );
};
export default TextOperation;
