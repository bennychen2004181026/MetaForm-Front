import React from 'react';

import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { IOption } from '@/interfaces/CreateForm';

const CheckboxList = ({
    options,
    setResult,
}: {
    options: IOption[];
    setResult: (selectedOptionIds: string[]) => void;
}) => {
    const [checked, setChecked] = React.useState(['']);

    const handleToggle = (toggledOptionId: string) => () => {
        const currentIndex = checked.indexOf(toggledOptionId);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(toggledOptionId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setResult(newChecked);
        setChecked(newChecked);
    };
    return (
        <List>
            {options.map((option) => {
                const labelId = `checkbox-list-label-${option.id}`;
                return (
                    <ListItem key={option.id}>
                        <ListItemButton role={undefined} onClick={handleToggle(option.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(option.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${option.value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CheckboxList;
