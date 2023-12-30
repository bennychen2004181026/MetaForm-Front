import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import { IForm, IImage, IQuestion } from '@/interfaces/CreateForm.interface';
import IOption from '@/interfaces/IOption';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';

const formState: IForm = {
    formId: '1',
    title: 'Test Form by Monash university',
    description:
        'This form is designed to conduct a survey on the employment of IT graduate in 2023',
    questions: [
        {
            questionType: '0',
            questionId: '1',
            required: true,
            title: { content: 'What is your age range?' },
            options: [
                { id: '1', value: 'Under 10' },
                { id: '2', value: '10 - 20' },
                { id: '3', value: '20 - 30' },
            ],
            other: false,
        },
    ],
};
type Actions =
    | {
          type: 'ADD_QUESTION';
          payload: IQuestion;
      }
    | {
          type: 'DELETE_QUESTION';
          payload: IQuestion;
      }
    | {
          type: 'CHANGE_FORM_TITLE';
          payload: string;
      }
    | {
          type: 'CHANGE_FORM_DESCRIPTION';
          payload: string;
      };
const formReducer = (state: IForm, action: Actions): IForm => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [...state.questions, payload],
            };
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter(
                    (question) => question.questionId !== action.payload.questionId,
                ),
            };
        case 'CHANGE_FORM_TITLE':
            return {
                ...state,
                title: action.payload,
            };
        case 'CHANGE_FORM_DESCRIPTION':
            return {
                ...state,
                description: action.payload,
            };
        default:
            throw new Error(
                'Invalid action, valid actions: [SAVE_TITLE,ADD_OPTION,DELETE_OPTION,CHANGE_QUESTION_TYPE]',
            );
    }
};

const NewFormGlobalContext = createContext<{
    state: IForm;
    dispatch: Dispatch<Actions>;
}>({ state: formState, dispatch: () => null });

interface Props {
    children: React.ReactNode;
}
const GlobalNewFormState: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, formState);
    const value = useMemo(() => {
        return { state, dispatch };
    }, [state]);
    return <NewFormGlobalContext.Provider value={value}>{children}</NewFormGlobalContext.Provider>;
};
export { NewFormGlobalContext, GlobalNewFormState };
