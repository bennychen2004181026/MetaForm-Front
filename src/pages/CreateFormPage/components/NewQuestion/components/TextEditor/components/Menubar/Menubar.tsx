import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { Editor } from '@tiptap/react';
import styled from 'styled-components';

import AddLinkPopup from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/AddLinkPopup';
import TextOperation from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/components/Menubar/components/TextOperations';

const StyledMenubar = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 0.5em;
    button {
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0rem 0.2rem;
        cursor: pointer;
        transition: 0.01s all;
        color: #bdbdbd;
    }
    button:hover {
        color: black;
    }
    .unlink {
        background-color: #e0e0e0;
        color: white;
    }
    .modal {
        padding: 10rem;
        position: absolute;
        top: 0;
        left: 2.2rem;
        background: #e0e0e0;
        z-index: 10;
        border-radius: 5px;
    }
    .is-active {
        color: black;
    }
`;
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
        <StyledMenubar>
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
                            <AddLinkIcon fontSize="small" />
                        </button>
                    )}
                    {modal && <AddLinkPopup editor={editor} modal={modal} setModal={setModal} />}
                </div>
            </div>
        </StyledMenubar>
    );
};
export default MenuBar;
