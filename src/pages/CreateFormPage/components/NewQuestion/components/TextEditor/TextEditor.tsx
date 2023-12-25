import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './Menubar';

const StyledMenubar = styled.div``;

const StyledEditor = styled.div``;
const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};

const TextEditor = () => {
    const [editorContent, setEditorContent] = useState('');
    const [focus, setFocus] = useState(true);
    const ref = useOutsideClick(() => {
        setFocus(false);
    });

    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Placeholder],
        autofocus: false,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onUpdate({ editor }) {
            setEditorContent(editor.getHTML());
        },
    });
    return (
        <StyledEditor ref={ref} onClick={() => setFocus(true)}>
            <EditorContent editor={editor} />
            {focus && (
                <StyledMenubar>
                    <MenuBar editor={editor} />
                </StyledMenubar>
            )}
        </StyledEditor>
    );
};
export default TextEditor;
