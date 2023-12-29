import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import IOption from '@/interfaces/IOption';
import { IImage, IQuestion } from '@/interfaces/IQuestion';

const initState: IQuestion = {
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
};
type Actions =
    | {
          type: 'ADD_OPTION';
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
      };
const questionReducer = (state: IQuestion, action: Actions): IQuestion => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_OPTION':
            return {
                ...state,
                options: [...state.options, payload],
            };
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
}
const GlobalState: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(questionReducer, initState);
    const value = useMemo(() => {
        return { state, dispatch };
    }, [state]);
    return <NewQuestionContext.Provider value={value}>{children}</NewQuestionContext.Provider>;
};
export { NewQuestionContext, GlobalState };
