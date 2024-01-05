import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import IForm from '@/interfaces/Form';
import dummyFormsData from '@/pages/FormListPage/DummyFormsData';

interface IUserFormState {
    searchedForms: IForm[];
    allForms: IForm[];
}
const initialState: IUserFormState = {
    searchedForms: dummyFormsData,
    allForms: dummyFormsData,
};

export const formCardsSlice = createSlice({
    name: 'formCards',
    initialState,
    reducers: {
        searchProductsByTitle: (state, action: PayloadAction<string>) => {
            const filter = state.allForms.filter((form) =>
                form.title.toLowerCase().includes(action.payload.toLocaleLowerCase()),
            );
            state.searchedForms = filter;
        },
    },
});

export const { searchProductsByTitle } = formCardsSlice.actions;
export default formCardsSlice.reducer;
export type { IUserFormState };
