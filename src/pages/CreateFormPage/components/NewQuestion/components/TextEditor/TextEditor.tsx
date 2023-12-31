import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { FormControl } from '@mui/material';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './components/Menubar/Menubar';

const StyledEditor = styled.div`
    .ProseMirror {
        background: #eeeeee;
        outline: none;
        color: rgb(0, 0, 0);
        font-size: 1.3rem;
        width: 95%;
        margin: 0.1rem auto;
        overflow: auto;
        height: 100%;
        font-family: 'Noto Sans', sans-serif;
    }
    .ProseMirror p.is-editor-empty:first-child::before {
        content: '       Your Question...';
        float: left;
        color: #ced4da;
        pointer-events: none;
        height: 0;
    }
    min-width: 400px;
    width: 600px;
`;

const TextEditor = ({ onTitleChange }: { onTitleChange: (newTitle: string) => void }) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Highlight, Placeholder],
        autofocus: false,
        onUpdate() {
            onTitleChange(editor!.getHTML());
        },
    });
    return (
        <StyledEditor>
            <EditorContent editor={editor} />
            <MenuBar editor={editor} />
        </StyledEditor>
    );
};
export default TextEditor;
