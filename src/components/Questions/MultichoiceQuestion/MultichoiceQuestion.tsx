import * as React from 'react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import styled from 'styled-components';

const Choice = styled(Typography).attrs({
    variant: 'body1',
    gutterBottom: true,
})``;
interface IMultiChoiceQuestionProps {
    title: string;
    choices: string[];
    required: boolean;
}
const MultiChoiceQuestion = ({ title, choices, required }: IMultiChoiceQuestionProps) => {
    const [value, setValue] = React.useState('');
    const [isRequired, setIsRequired] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const [error, setError] = React.useState(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value) {
            setHelperText('Please select an option.');
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} error={error} variant="standard">
                <FormLabel id="demo-error-radios" sx={{}}>
                    <Typography variant="h4">{title}</Typography>
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="best" control={<Radio />} label="The best!" />
                    <FormControlLabel
                        value="worst"
                        control={<Radio />}
                        label={<Choice>World</Choice>}
                    />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                    Check Answer
                </Button>
            </FormControl>
        </form>
    );
};

export default MultiChoiceQuestion;
