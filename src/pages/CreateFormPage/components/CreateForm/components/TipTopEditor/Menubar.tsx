import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import './styles.css';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';

import AddLinkBox from './AddLinkBox';
import TextOperation from './TextOperations';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [modal, setModal] = useState<boolean>(false);
    if (!editor) {
        return null;
    }
    return (
        <div>
            <TextOperation editor={editor} />
            <div>
                <div>
                    {editor.isActive('link') ? (
                        <IconButton
                            type="button"
                            className="unlink"
                            title="Remove link"
                            onClick={() => editor.chain().focus().unsetLink().run()}
                        >
                            <LinkOffIcon />
                        </IconButton>
                    ) : (
                        <IconButton type="button" title="add a link" onClick={() => setModal(true)}>
                            <AddLinkIcon />
                        </IconButton>
                    )}
                    {modal && <AddLinkBox editor={editor} setModal={setModal} />}
                </div>
            </div>
        </div>
    );
};
export default MenuBar;
