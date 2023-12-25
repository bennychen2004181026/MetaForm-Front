import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';
import './styles.css';

import AddLinkPopup from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/AddLinkPopup';
import TextOperation from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/Menubar/components/TextOperations';

const MenuBar = ({
    editor,
    setFocus,
}: {
    editor: Editor | null;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                    {modal && <AddLinkPopup editor={editor} modal={modal} setModal={setModal} />}
                </div>
            </div>
        </div>
    );
};
export default MenuBar;
