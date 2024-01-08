import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IForm, INewForm } from '@/interfaces/CreateForm';
import { IRootState } from '@/store/store';

const CREATE_FORM_API = `http://localhost:3001/forms/`;
const CREATE_QUESTION_API = `http://localhost:3001/questions/`;

const FETCH_FORM_API = (userId: string) => `http://localhost:3001/forms/user/${userId}`;

enum formStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
}
interface IFormState {
    searchedForms: IForm[];
    status: formStatus;
    error?: string;
    newForm?: IForm;
}
const addNewForm = createAsyncThunk('forms/createNewForm', async (newForm: IForm) => {
    const { questions: formQuestions } = newForm;
    const createdQuestionIds: string[] = [];
    await Promise.all(
        formQuestions.map(async (question) => {
            const response = await axios.post(CREATE_QUESTION_API, {
                question,
            });
            createdQuestionIds.push(response.data.createdQuestion._id.toString());
        }),
    );
    const form: INewForm = { ...newForm, questions: createdQuestionIds };
    const response = await axios.post(CREATE_FORM_API, form);
    return response.data;
});
const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
    const response = await axios.get(FETCH_FORM_API('659a9d5c8452e4e167e11c47'));
    return response.data;
});

const initialState: IFormState = {
    searchedForms: [],
    status: formStatus.IDLE,
};

export const formSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        searchProductsByTitle: (state, action: PayloadAction<string>) => {
            const filter = state.searchedForms.filter((form) =>
                form.title.toLowerCase().includes(action.payload.toLocaleLowerCase()),
            );
            state.searchedForms = filter;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchForms.pending, (state) => {
                state.status = formStatus.LOADING;
            })
            .addCase(fetchForms.fulfilled, (state, action) => {
                state.status = formStatus.SUCCESS;
                state.searchedForms = action.payload;
            })
            .addCase(fetchForms.rejected, (state, action) => {
                state.status = formStatus.FAILED;
                state.error = action.error.message;
            });
    },
});
const getFilteredForms = (state: IRootState) => state.forms.searchedForms;
const getFormsStatus = (state: IRootState) => state.forms.status;
const getFormsError = (state: IRootState) => state.forms.error;

export const { searchProductsByTitle } = formSlice.actions;
export { getFilteredForms, getFormsStatus, getFormsError, addNewForm, fetchForms, formStatus };
export default formSlice;
