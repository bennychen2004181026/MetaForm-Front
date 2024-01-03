import React from 'react';

import { FormatBold, FormatClear, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import { Editor } from '@tiptap/react';
import styled from 'styled-components';

const StyledButton = styled.button<{ active?: boolean }>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: 0.1s all;
    color: ${({ active }) => (active ? '#212121' : '#757575')};
    &:hover {
        color: #212121;
    }
`;
const TextOperation = ({ editor }: { editor: Editor }) => {
    return (
        <div className="flex">
            <StyledButton
                title="bold"
                type="button"
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <FormatBold fontSize="small" />
            </StyledButton>
            <StyledButton
                title="Italics"
                type="button"
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <FormatItalic fontSize="small" />
            </StyledButton>
            <StyledButton
                title="underline"
                type="button"
                active={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <FormatUnderlined fontSize="small" />
            </StyledButton>
            <StyledButton
                title="unset-all-marks"
                type="button"
                active
                onClick={() => editor.commands.unsetAllMarks()}
            >
                <FormatClear fontSize="small" />
            </StyledButton>
        </div>
    );
};
export { StyledButton, TextOperation };
