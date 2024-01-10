import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { Editor } from '@tiptap/react';
import styled from 'styled-components';

import AddLinkPopup from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/AddLinkPopup';
import {
    StyledButton,
    TextOperation,
} from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/Menubar/components/TextOperations';

const StyledMenubar = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0.8em 0 0 1em;
    gap: 5px;
`;
const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [open, setOpen] = useState(false);
    if (!editor) {
        return null;
    }
    return (
        <StyledMenubar>
            <TextOperation editor={editor} />
            <div className="flex">
                <div className="relative">
                    {editor.isActive('link') ? (
                        <StyledButton
                            type="button"
                            title="Remove link"
                            onClick={() => editor.chain().focus().unsetLink().run()}
                        >
                            <LinkOffIcon />
                        </StyledButton>
                    ) : (
                        <StyledButton
                            type="button"
                            title="add a link"
                            onClick={() => setOpen(true)}
                        >
                            <AddLinkIcon fontSize="small" />
                        </StyledButton>
                    )}
                    {open && <AddLinkPopup editor={editor} open={open} setOpen={setOpen} />}
                </div>
            </div>
        </StyledMenubar>
    );
};
export default MenuBar;
