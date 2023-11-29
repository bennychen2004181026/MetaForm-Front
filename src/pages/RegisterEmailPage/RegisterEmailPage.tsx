import React from 'react';

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Title from '@/layouts/MainLayout/Title';
import GlobalStyle from '@/styles/GlobalStyle';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-conetnet: center;
    width: 30%;
`;

const InputField = styled(TextField)`
    width: 350px;
    margin-bottom: 30px;
`;

const RegisterEmail = () => {
    return (
        <Content>
            <FormGroup>
                <GlobalStyle />
                <Title content="Create your account" />
                <InputField id="username" label="Username" variant="outlined" />
                <InputField id="workemail" label="Work Email" variant="outlined" />
                <Typography variant="subtitle1" padding="5px">
                    Opt-in
                </Typography>
                <FormControlLabel
                    control={<Checkbox />}
                    id="marketingemails"
                    label="Marketing Emails"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    id="newsemails"
                    label="News & Updates Emails"
                />
                <FormControlLabel
                    required
                    control={<Checkbox />}
                    id="termsconditions"
                    label="I agree to MetaForm's Terms of Service, Privacy Policy and Data Processing Agreement"
                />
                <Button
                    variant="contained"
                    sx={{ width: '300px', marginTop: '35px', alignSelf: 'center' }}
                >
                    Create My Account
                </Button>
            </FormGroup>
        </Content>
    );
};

export default RegisterEmail;
