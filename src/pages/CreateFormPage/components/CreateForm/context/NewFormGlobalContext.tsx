import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import { IForm, IQuestion } from '@/interfaces/CreateForm';
import { initFormState } from '@/pages/CreateFormPage/components/CreateForm/InitformState';

type Actions =
    | {
          type: 'ADD_QUESTION';
          payload: IQuestion;
      }
    | {
          type: 'UPDATE_QUESTION';
          payload: IQuestion[];
      }
    | {
          type: 'DELETE_QUESTION';
          payload: string;
      }
    | {
          type: 'CHANGE_FORM_TITLE';
          payload: string;
      }
    | {
          type: 'CHANGE_FORM_DESCRIPTION';
          payload: string;
      }
    | {
          type: 'SET_QUESTIONS';
          payload: IQuestion[];
      }
    | {
          type: 'SAVE_FORM';
          payload: '';
      };
const formReducer = (state: IForm, action: Actions): IForm => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [...state.questions, payload],
            };
        case 'UPDATE_QUESTION':
            return { ...state, questions: payload };
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter((question) => question.questionId !== payload),
            };
        case 'CHANGE_FORM_TITLE':
            return {
                ...state,
                title: payload,
            };
        case 'CHANGE_FORM_DESCRIPTION':
            return {
                ...state,
                description: payload,
            };
        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: payload,
            };
        case 'SAVE_FORM':
            return state;
        default:
            throw new Error(
                'Invalid action, valid actions: [SAVE_TITLE,ADD_OPTION,DELETE_OPTION,CHANGE_QUESTION_TYPE]',
            );
    }
};

const NewFormGlobalContext = createContext<{
    state: IForm;
    dispatch: Dispatch<Actions>;
}>({ state: initFormState, dispatch: () => null });

interface Props {
    children: React.ReactNode;
}

const GlobalNewFormState: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initFormState);
    const value = useMemo(() => {
        return { state, dispatch };
    }, [state]);
    return <NewFormGlobalContext.Provider value={value}>{children}</NewFormGlobalContext.Provider>;
};

export { NewFormGlobalContext, GlobalNewFormState };
