import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IFectchedForm, IQuestion } from '@/interfaces/CreateForm';
import { IAnswer } from '@/interfaces/CreateResponse';
import { IRootState } from '@/store/store';

const FETCH_FORM_API = (formId: string) => `http://localhost:3005/forms/${formId}`;
const FETCH_FORM_QUESTION_API = (questionId: string) =>
    `http://localhost:3005/questions/${questionId}`;

enum FormStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
}
interface IResponseStatus {
    allQuestionAnswered: boolean;
    questionsNotAnswered: string[];
}
interface IFormResponseState {
    currentForm: IFectchedForm | null;
    fetchFormStatus: FormStatus;
    fetchFormError?: string;
    responseStatus: IResponseStatus;
    response: IAnswer[];
    formQuestions: IQuestion[];
    fetchQuestionsStatus: FormStatus;
    fetchQuestionsError?: string;
}

const initialState: IFormResponseState = {
    currentForm: null,
    fetchFormStatus: FormStatus.IDLE,
    fetchFormError: '',
    fetchQuestionsStatus: FormStatus.IDLE,
    fetchQuestionsError: '',
    formQuestions: [],
    response: [],
    responseStatus: { allQuestionAnswered: false, questionsNotAnswered: [] },
};
const fetchFormById = createAsyncThunk('formResponse/fetchForm', async (formId: string) => {
    const response = await axios.get(FETCH_FORM_API(formId));
    return response.data;
});

const fetchQuestions = createAsyncThunk(
    'formResponse/fetchFormQuestions',
    async (questions: string[]) => {
        const responses = await Promise.all(
            questions.map(async (questionId) => {
                const response = await axios.get(FETCH_FORM_QUESTION_API(questionId));
                return response.data;
            }),
        );
        return responses;
    },
);

export const formResponseSlice = createSlice({
    name: 'formResponse',
    initialState,
    reducers: {
        answerQuestion: (state, action: PayloadAction<IAnswer>) => {
            const currentAnswerIndex = state.response.findIndex(
                (answer) => answer.questionId === action.payload.questionId,
            );
            if (currentAnswerIndex === -1) {
                state.response.push(action.payload);
            } else {
                state.response[currentAnswerIndex] = action.payload;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFormById.pending, (state) => {
                state.fetchFormStatus = FormStatus.LOADING;
            })
            .addCase(fetchFormById.fulfilled, (state, action) => {
                state.fetchFormStatus = FormStatus.SUCCESS;
                state.currentForm = action.payload;
            })
            .addCase(fetchFormById.rejected, (state, action) => {
                state.fetchFormStatus = FormStatus.FAILED;
                state.fetchFormError = action.error.message;
            })
            .addCase(fetchQuestions.pending, (state) => {
                state.fetchQuestionsStatus = FormStatus.LOADING;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.fetchFormStatus = FormStatus.SUCCESS;
                state.formQuestions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.fetchQuestionsStatus = FormStatus.FAILED;
                state.fetchQuestionsError = action.error.message;
            });
    },
});
const getFetchFormStatus = (state: IRootState) => state.formResponse.fetchFormStatus;
const getFetchFormError = (state: IRootState) => state.formResponse.fetchFormError;
const getFormQuestionIds = (state: IRootState) => state.formResponse.currentForm!.questions;
const getFormQuestions = (state: IRootState) => state.formResponse.formQuestions;

export {
    getFetchFormStatus,
    getFetchFormError,
    FormStatus,
    getFormQuestionIds,
    fetchFormById,
    fetchQuestions,
    getFormQuestions,
};
export default formResponseSlice;
