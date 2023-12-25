import React, { useState } from 'react';

import { Editor } from '@tiptap/react';

const AddLinkBox = ({
    editor,
    setModal,
}: {
    editor: Editor;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [input, setInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const setlink = (inputLink: string) => {
        editor.chain().focus().extendMarkRange('link').setLink({ href: inputLink }).run();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setlink(input);
        setModal(false);
        setInput('');
    };
    return (
        <div className="relative">
            <div className="modal">
                <button type="button" onClick={() => setModal(false)} className="absolute close">
                    x
                </button>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-1 jcc aic">
                    <label className="f-white" htmlFor="input1">
                        Add link
                    </label>
                    <input onChange={(e) => handleChange(e)} id="input1" />
                    <button
                        type="button"
                        className="btn btn-blue w-100"
                        onClick={() => handleSubmit}
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddLinkBox;
