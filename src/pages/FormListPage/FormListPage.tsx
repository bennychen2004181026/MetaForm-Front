import React from 'react';

import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { Box, Button, TextField } from '@mui/material';
import { Provider, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FormCards from './components/FormsCards/components/FormCards';
import Table from './components/Table';
import IForm from '@/interfaces/Form';
import DisplayModeToggle from '@/pages/FormListPage/components/DisplayModeToggle';
import store from '@/store';
import { searchProductsByTitle } from '@/store/slices/formCards/formCardsSlice';
import { IRootState } from '@/store/store';
import GlobalStyle from '@/styles/GlobalStyle';

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
const StyledAddQuestionButton = styled(Button)`
    width: 200px;
    margin-top: 20px;
    margin: 0 auto;
`;
const FormList = () => {
    const [displayMode, setDisplayMode] = React.useState<string>('cards');
    const dispatch = useDispatch();

    const companyForms = useSelector<IRootState, IForm[]>((state) => state.formCards.searchedForms);

    const handleSearchBarChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const searchInput = e.target.value;
        dispatch(searchProductsByTitle(searchInput));
    };
    return (
        <Provider store={store.store}>
            <StyledPageContainer>
                <GlobalStyle />

                <StyledHeader>
                    <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"
                        onChange={(e) => handleSearchBarChange(e)}
                    />
                    <StyledDisplayModeToggle
                        displayMode={displayMode}
                        setDisplayMode={setDisplayMode}
                    />
                </StyledHeader>

                <div>
                    {displayMode === 'cards' && <FormCards forms={companyForms} />}
                    {displayMode === 'list' && <Table forms={companyForms} />}
                </div>
                <StyledAddQuestionButton
                    aria-label="Add New Question"
                    variant="contained"
                    startIcon={<ControlPointOutlinedIcon />}
                >
                    Create Form
                </StyledAddQuestionButton>
            </StyledPageContainer>
        </Provider>
    );
};

export default FormList;
