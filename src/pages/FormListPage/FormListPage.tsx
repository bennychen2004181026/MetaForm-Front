import React, { useEffect } from 'react';

import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import FormCards from './components/FormsCards/components/FormCards';
import Table from './components/Table';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import DisplayModeToggle from '@/pages/FormListPage/components/DisplayModeToggle';
import {
    FormStatus,
    fetchForms,
    getFilteredForms,
    getFormsError,
    getFormsStatus,
    searchProductsByTitle,
} from '@/store/slices/createForm/createFormSlice';
import { AppDispatch } from '@/store/store';
import GlobalStyle from '@/styles/GlobalStyle';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledPageContainer = styled(Box)`
    max-width: 1680px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;
const StyledDisplayModeToggle = styled(DisplayModeToggle)`
    border: 1px solid;
`;
const StyledHeader = styled.div`
    width: 1280px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const StyledFormsContainer = styled.div`
    width: 1280px;
`;
const StyledAddQuestionButton = styled(Button)`
    width: 200px;
    margin-top: 20px;
    margin: 0 auto;
`;
const FormList = () => {
    const [displayMode, setDisplayMode] = React.useState<string>('cards');
    const dispatch = useDispatch<AppDispatch>();
    const formsStatus = useSelector(getFormsStatus);
    const companyForms = useSelector(getFilteredForms);
    const error = useSelector(getFormsError);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchForms());
    }, []);
    if (formsStatus === FormStatus.LOADING) {
        return <LoadingSpinner />;
    }
    if (formsStatus === FormStatus.FAILED) {
        const showSnackbar = useSnackbarHelper();
        showSnackbar(`message: ${error}`, 'error');
    }
    const handleSearchBarChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const searchInput = e.target.value;
        dispatch(searchProductsByTitle(searchInput));
    };
    return (
        <StyledPageContainer>
            <GlobalStyle />
            <StyledHeader>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    onChange={(e) => handleSearchBarChange(e)}
                />
                <StyledAddQuestionButton
                    aria-label="Add New Question"
                    variant="contained"
                    startIcon={<ControlPointOutlinedIcon />}
                    onClick={() => navigate('/create-form')}
                >
                    Create Form
                </StyledAddQuestionButton>
                <StyledDisplayModeToggle
                    displayMode={displayMode}
                    setDisplayMode={setDisplayMode}
                />
            </StyledHeader>
            <StyledFormsContainer>
                {displayMode === 'cards' && <FormCards forms={companyForms} />}
                {displayMode === 'list' && <Table forms={companyForms} />}
            </StyledFormsContainer>
        </StyledPageContainer>
    );
};

export default FormList;
