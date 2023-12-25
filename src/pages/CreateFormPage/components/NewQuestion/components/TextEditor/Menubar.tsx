import React, { useState } from 'react';

import { Editor } from '@tiptap/react';
import { BiUnlink } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import './styles.css';
import { RiImageAddFill } from 'react-icons/ri';

import AddLinkBox from './AddLinkBox';
import TextOperation from './TextOperations';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [modal, setModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);

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
                            <BiUnlink />
                        </button>
                    ) : (
                        <button type="button" title="add a link" onClick={() => setModal(true)}>
                            <BsLink45Deg size={28} />
                        </button>
                    )}
                    {modal && <AddLinkBox editor={editor} setModal={setModal} />}
                </div>
            </div>
        </div>
    );
};
export default MenuBar;
