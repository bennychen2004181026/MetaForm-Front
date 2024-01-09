import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { IForm, INewForm } from '@/interfaces/CreateForm';
import { IRootState } from '@/store/store';

const CREATE_FORM_API = `http://localhost:3005/forms/`;
const CREATE_QUESTION_API = `http://localhost:3005/questions/`;

const FETCH_FORM_API = (userId: string) => `http://localhost:3005/forms/user/${userId}`;

enum FormStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
}
interface IFormState {
    searchedForms: IForm[];
    fetchFormStatus: FormStatus;
    error?: string;
    newForm?: IForm;
    createFormStatus: FormStatus;
    createFormError?: string;
}
const addNewForm = createAsyncThunk('forms/createNewForm', async (newForm: IForm) => {
    const { questions: formQuestions } = newForm;
    const createdQuestionIds: string[] = [];
    await Promise.all(
        formQuestions.map(async (question) => {
            const response: AxiosResponse = await axios
                .post(CREATE_QUESTION_API, {
                    question,
                })
                .catch(() => {
                    return response.data;
                });
            createdQuestionIds.push(response.data.createdQuestion._id.toString());
        }),
    )
        .then(async () => {
            const form: INewForm = { ...newForm, questions: createdQuestionIds };
            const response = await axios.post(CREATE_FORM_API, form);
            return response.data;
        })
        .catch((error) => {
            return error;
        });
});
const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
    const response = await axios.get(FETCH_FORM_API('659a9d5c8452e4e167e11c47'));
    return response.data;
});

const initialState: IFormState = {
    searchedForms: [],
    fetchFormStatus: FormStatus.IDLE,
    createFormStatus: FormStatus.IDLE,
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
                state.fetchFormStatus = FormStatus.LOADING;
            })
            .addCase(fetchForms.fulfilled, (state, action) => {
                state.fetchFormStatus = FormStatus.SUCCESS;
                state.searchedForms = action.payload;
            })
            .addCase(fetchForms.rejected, (state, action) => {
                state.fetchFormStatus = FormStatus.FAILED;
                state.error = action.error.message;
            })
            .addCase(addNewForm.pending, (state) => {
                state.createFormStatus = FormStatus.LOADING;
            })
            .addCase(addNewForm.fulfilled, (state) => {
                state.createFormStatus = FormStatus.SUCCESS;
            })
            .addCase(addNewForm.rejected, (state, action) => {
                state.createFormStatus = FormStatus.FAILED;
                state.createFormError = action.error.message;
            });
    },
});
const getFilteredForms = (state: IRootState) => state.forms.searchedForms;
const getFormsStatus = (state: IRootState) => state.forms.fetchFormStatus;
const getFormsError = (state: IRootState) => state.forms.error;

export const { searchProductsByTitle } = formSlice.actions;
export { getFilteredForms, getFormsStatus, getFormsError, addNewForm, fetchForms, FormStatus };
export default formSlice;
