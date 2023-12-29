import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './components/Menubar/Menubar';

const StyledMenubar = styled.div``;

const StyledEditor = styled.div`
    .ProseMirror {
        border: 1px solid #03787c;
        background: #eeeeee;
        outline: none;
        color: rgb(0, 0, 0);
        font-size: 1.3rem;
        width: 95%;
        margin: 0.1rem auto;
        overflow: auto;
        height: 100%;
    }
    .t-center {
        text-align: left;
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
const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target) {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};

const TextEditor = ({ onTitleChange }: { onTitleChange: (newTitle: string) => void }) => {
    const [focus, setFocus] = useState(true);
    const ref = useOutsideClick(() => {
        setFocus(false);
    });
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Highlight, Placeholder],
        autofocus: false,
        onUpdate() {
            onTitleChange(editor!.getHTML());
        },
    });
    return (
        <StyledEditor ref={ref} onClick={() => setFocus(true)}>
            <EditorContent editor={editor} />
            {focus && (
                <StyledMenubar>
                    <MenuBar editor={editor} setFocus={setFocus} />
                </StyledMenubar>
            )}
        </StyledEditor>
    );
};
export default TextEditor;
