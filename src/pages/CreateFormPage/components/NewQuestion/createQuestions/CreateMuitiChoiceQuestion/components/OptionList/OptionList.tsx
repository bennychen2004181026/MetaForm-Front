import React, { useContext, useState } from 'react';

import { List } from '@mui/material';

import Option from '../Option';

import { IOption } from '@/interfaces/CreateForm';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const OptionList = ({ isCheckbox }: { isCheckbox: boolean }) => {
    const { dispatch, state } = useContext(NewQuestionContext);
    const options = state.options!;
    const [draggingOption, setDraggingOption] = useState<null | IOption>(null);
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, option: IOption) => {
        setDraggingOption(option);
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingOption(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (targetOption: IOption) => {
        if (!draggingOption) return;

        const currentIndex = options.indexOf(draggingOption);
        const targetIndex = options.indexOf(targetOption);

        if (currentIndex !== -1 && targetIndex !== -1) {
            options.splice(currentIndex, 1);
            options.splice(targetIndex, 0, draggingOption);
            dispatch({
                type: 'SET_OPTIONS',
                payload: options,
            });
        }
    };
    return (
        <List>
            {options.map((option) => (
                <div
                    key={option.value}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, option)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(option)}
                >
                    <Option option={option} checkbox={isCheckbox} />
                </div>
            ))}
        </List>
    );
};

export default OptionList;
