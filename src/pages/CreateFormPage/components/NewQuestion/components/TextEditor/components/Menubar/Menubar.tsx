import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';
import './styles.css';

import AddLinkBox from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/AddLinkBox';
import TextOperation from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/Menubar/components/TextOperations';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [modal, setModal] = useState(false);
    if (!editor) {
        return null;
    }
    return (
        <div className="btn-array gap-1 mtb1-rem">
            <TextOperation editor={editor} />
            <div className="flex">
                <div className="relative" onMouseLeave={() => setModal(false)}>
                    {editor.isActive('link') ? (
                        <button
                            className="unlink"
                            type="button"
                            title="Remove link"
                            onClick={() => editor.chain().focus().unsetLink().run()}
                        >
                            <LinkOffIcon />
                        </button>
                    ) : (
                        <button type="button" title="add a link" onClick={() => setModal(true)}>
                            <AddLinkIcon />
                        </button>
                    )}
                    {modal && <AddLinkBox editor={editor} setModal={setModal} />}
                </div>
            </div>
        </div>
    );
};
export default MenuBar;
