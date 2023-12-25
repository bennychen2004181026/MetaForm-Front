import React from 'react';

import { Editor } from '@tiptap/react';
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from 'react-icons/bs';

const TextOperation = ({ editor }: { editor: Editor }) => {
    return (
        <div className="flex">
            <button
                title="bold"
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <BsTypeBold size={28} />
            </button>
            <button
                title="Italics"
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <BsTypeItalic size={28} />
            </button>
            <button
                title="underline"
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <BsTypeUnderline size={28} />
            </button>
        </div>
    );
};
export default TextOperation;
