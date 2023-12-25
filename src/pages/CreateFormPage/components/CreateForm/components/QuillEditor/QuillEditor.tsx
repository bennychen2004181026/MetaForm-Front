import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Editor = () => {
    const highlightColors = [
        '#00FFFF',
        '#008000',
        '#008080',
        '#FF0000',
        '##808080',
        '#C0C0C0',
        'white',
    ];
    const textColors = [
        '#FF1493',
        '#FF0000',
        '#006400',
        '#228B22',
        '#00FF00',
        '#FFD700',
        '#F5F5DC',
        'black',
    ];
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ color: textColors }],
            [{ background: highlightColors }],
        ],
    };

    const formats = ['bold', 'italic', 'underline', 'link', 'color', 'image', 'background'];

    const [code, setCode] = useState(
        'hello guys you can also add fonts and another features to this editor.',
    );
    const handleProcedureContentChange = (content: string) => {
        setCode(content);
    };
    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={code}
                onChange={handleProcedureContentChange}
            />
        </div>
    );
};
export default Editor;
