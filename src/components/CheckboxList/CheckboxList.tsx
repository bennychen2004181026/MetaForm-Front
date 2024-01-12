import React, { useState } from 'react';

import { CheckBox } from '@mui/icons-material';
import {
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import styled from 'styled-components';

import { IOption } from '@/interfaces/CreateForm';

const OtherOption = styled.div`
    display: flex;
    flex-direction: column;
`;
const CheckboxList = ({
    options,
    setResult,
    other,
}: {
    options: IOption[];
    setResult: (selectedOptionIds: string[]) => void;
    other?: boolean;
}) => {
    const [checked, setChecked] = React.useState(['']);
    const [_, setOpenOtherTextField] = useState(false);

    // const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value);
    //     if (event.target.value === 'Other') {
    //         setOpenOtherTextField(true);
    //     } else {
    //         setOpenOtherTextField(false);
    //     }
    // };
    const handleToggle = (toggledOption: IOption) => () => {
        const { id: toggledOptionId, otherOption } = toggledOption;

        const currentIndex = checked.indexOf(toggledOptionId);
        const newChecked = [...checked];
        if (otherOption) {
            newChecked.push(toggledOptionId);
            setResult(newChecked);
            setChecked(newChecked);
            setOpenOtherTextField(true);
        } else {
            if (currentIndex === -1) {
                newChecked.push(toggledOptionId);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setResult(newChecked);
            setChecked(newChecked);
        }
    };
    return (
        <List>
            {options.map((option) => {
                const labelId = `checkbox-list-label-${option.id}`;
                return (
                    <ListItem key={option.id}>
                        <ListItemButton role={undefined} onClick={handleToggle(option)}>
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
            {other && (
                <OtherOption>
                    <FormControlLabel
                        key="Other"
                        value="Other"
                        control={<CheckBox />}
                        label="Other"
                    />
                    {/* {openOtherTextField && (
                        <MultiLineTextField
                            multilines={false}
                            requiredQuestion={question.required}
                        />
                    )} */}
                </OtherOption>
            )}
        </List>
    );
};

export default CheckboxList;
