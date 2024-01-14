import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAnswer, IFectchedForm, IQuestionResponse } from '@/interfaces/CreateResponse';
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

interface IFormResponseState {
    currentForm: IFectchedForm | null;
    fetchFormStatus: FormStatus;
    fetchFormError?: string;
    formQuestions: IQuestionResponse[];
    fetchQuestionsStatus: FormStatus;
    fetchQuestionsError?: string;
    submitClicked: boolean;
}

const initialState: IFormResponseState = {
    fetchFormStatus: FormStatus.IDLE,
    fetchFormError: '',
    fetchQuestionsStatus: FormStatus.IDLE,
    fetchQuestionsError: '',
    formQuestions: [],
    submitClicked: false,
    currentForm: null,
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
        saveQuestionAnswer: (state, action: PayloadAction<IAnswer>) => {
            const currentQuestionResponse = state.formQuestions.find(
                (questionResponse) => questionResponse.question._id === action.payload.questionId,
            );
            if (currentQuestionResponse) {
                if (action.payload.answerBody.length === 0) {
                    currentQuestionResponse.questionAnswered = false;
                }
                currentQuestionResponse.questionAnswer = action.payload;
                currentQuestionResponse.questionAnswered = true;
            }
        },
        submitForm: (state) => {
            state.submitClicked = true;
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
                const formQuestions = action.payload;
                const initializedQuestionResponses = formQuestions.map((question) => {
                    const initializedAnswer: IAnswer = {
                        questionId: question.questionId,
                        answerBody: [],
                    };
                    return { question, questionAnswered: false, questionAnswer: initializedAnswer };
                });
                state.formQuestions = initializedQuestionResponses;
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
const getSubmitClicked = (state: IRootState) => state.formResponse.submitClicked;
const getForm = (state: IRootState) => state.formResponse.currentForm;

const getQuestionResponse = (state: IRootState, questionId: string) => {
    const { formQuestions } = state.formResponse;
    const responseIndex = formQuestions.findIndex(
        (response) => response.question._id === questionId,
    );
    return state.formResponse.formQuestions[responseIndex];
};

export {
    getFetchFormStatus,
    getFetchFormError,
    FormStatus,
    getFormQuestionIds,
    fetchFormById,
    fetchQuestions,
    getForm,
    getFormQuestions,
    getQuestionResponse,
    getSubmitClicked,
};
export const { saveQuestionAnswer, submitForm } = formResponseSlice.actions;
export default formResponseSlice;
