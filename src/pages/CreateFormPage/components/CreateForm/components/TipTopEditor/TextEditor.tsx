import React, { useState } from 'react';

import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './Menubar';

const TextEditor = () => {
    const [editorContent, setEditorContent] = useState('');

    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Placeholder],
        autofocus: false,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onUpdate({ editor }) {
            setEditorContent(editor.getHTML());
        },
    });
    // console.log(editorContent);
    return (
        <div>
            <EditorContent editor={editor} />
            <MenuBar editor={editor} />
        </div>
    );
};
export default TextEditor;
