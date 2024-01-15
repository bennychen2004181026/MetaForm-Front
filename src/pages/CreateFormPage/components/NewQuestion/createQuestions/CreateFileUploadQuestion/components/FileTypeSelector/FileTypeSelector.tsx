import React, { useState } from 'react';

import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { IOption } from '@/interfaces/CreateForm';
import ImageContainer from '@/layouts/ImageContainer';

const FileTypeSelector = ({
    options,
    handleFileTypesChange,
}: {
    options: IOption[];
    handleFileTypesChange: (selected: string[]) => void;
}) => {
    const [selected, setSelected] = useState(['']);

    const handleToggle = (toggledOption: IOption) => () => {
        const { id } = toggledOption;
        const currentIndex = selected.indexOf(id);
        const newChecked = [...selected];
        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setSelected(newChecked);
        handleFileTypesChange(selected);
    };
    return (
        <List dense>
            {options.map((option) => {
                const labelId = `checkbox-list-label-${option.id}`;
                return (
                    <>
                        <ListItem key={option.id}>
                            <ListItemButton role={undefined} onClick={handleToggle(option)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected.indexOf(option.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${option.value}`} />
                            </ListItemButton>
                        </ListItem>
                        {option.image && <ImageContainer large={false} image={option.image} />}
                    </>
                );
            })}
        </List>
    );
};

export default FileTypeSelector;
