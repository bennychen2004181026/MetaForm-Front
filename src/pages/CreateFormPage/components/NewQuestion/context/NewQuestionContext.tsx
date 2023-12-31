import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import { IImage, IQuestion } from '@/interfaces/CreateForm.interface';
import IOption from '@/interfaces/IOption';
import { initQuestionState as initState } from '@/pages/CreateFormPage/components/CreateForm/initForm';

type Actions =
    | {
          type: 'ADD_OPTION';
          payload: IOption;
      }
    | {
          type: 'UPDATE_OPTION';
          payload: IOption;
      }
    | {
          type: 'DELETE_OPTION';
          payload: IOption;
      }
    | {
          type: 'SAVE_TITLE';
          payload: string;
      }
    | {
          type: 'INSERT_TITLE_IMAGE';
          payload: IImage;
      }
    | {
          type: 'CHANGE_QUESTION_TYPE';
          payload: string;
      }
    | {
          type: 'SET_OPTIONS';
          payload: IOption[];
      }
    | {
          type: 'ALLOW_OTHER_OPTION';
          payload: boolean;
      }
    | {
          type: 'SET_REQUIRED';
          payload: boolean;
      }
    | {
          type: 'CHANGE_QUESTION_ID';
          payload: string;
      };
const questionReducer = (state: IQuestion, action: Actions): IQuestion => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_OPTION':
            return {
                ...state,
                options: [...state.options, payload],
            };
        case 'UPDATE_OPTION':
            state.options.find((a) => a.id === payload.id)!.value = payload.value;
            return state;
        case 'DELETE_OPTION':
            return {
                ...state,
                options: state.options.filter((option) => option.id !== action.payload.id),
            };
        case 'SAVE_TITLE':
            return {
                ...state,
                title: { ...state.title, content: action.payload },
            };
        case 'INSERT_TITLE_IMAGE':
            return {
                ...state,
                title: { ...state.title, image: action.payload },
            };
        case 'CHANGE_QUESTION_TYPE':
            return {
                ...state,
                questionType: action.payload,
            };
        case 'SET_OPTIONS':
            return {
                ...state,
                options: action.payload,
            };
        case 'ALLOW_OTHER_OPTION':
            return {
                ...state,
                other: action.payload,
            };
        case 'SET_REQUIRED':
            return {
                ...state,
                required: action.payload,
            };
        case 'CHANGE_QUESTION_ID':
            return {
                ...state,
                questionId: action.payload,
            };
        default:
            throw new Error(
                'Invalid action, valid actions: [SAVE_TITLE,ADD_OPTION,DELETE_OPTION,CHANGE_QUESTION_TYPE]',
            );
    }
};

const NewQuestionContext = createContext<{
    state: IQuestion;
    dispatch: Dispatch<Actions>;
}>({ state: initState, dispatch: () => null });

interface Props {
    children: React.ReactNode;
    questionState: IQuestion;
}
const GlobalNewQuestionState: React.FC<Props> = ({ children, questionState }) => {
    const [state, dispatch] = useReducer(questionReducer, questionState);
    const value = useMemo(() => {
        return { state, dispatch };
    }, [state]);
    return <NewQuestionContext.Provider value={value}>{children}</NewQuestionContext.Provider>;
};
export { NewQuestionContext, GlobalNewQuestionState as GlobalState };
