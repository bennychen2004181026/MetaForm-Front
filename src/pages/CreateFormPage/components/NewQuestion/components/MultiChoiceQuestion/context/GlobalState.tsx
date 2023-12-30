import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import IOption from '@/interfaces/IOption';
import IQuestion from '@/interfaces/IQuestion';

const initState: IQuestion = {
    questionType: '0',
    title: 'What is your age range?',
    options: [
        { id: '1', value: 'Under 10' },
        { id: '2', value: '10 - 20' },
        { id: '3', value: '20 - 30' },
    ],
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
          type: 'CHANGE_QUESTION_TYPE';
          payload: string;
      };
const questionReducer = (state: IQuestion, action: Actions): IQuestion => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_OPTION':
            return {
                ...state,
                options: [payload, ...state.options],
            };
        case 'DELETE_OPTION':
            return {
                ...state,
                options: state.options.filter((option) => option.id !== action.payload.id),
            };
        case 'SAVE_TITLE':
            return {
                ...state,
                title: action.payload,
            };
        case 'CHANGE_QUESTION_TYPE':
            return {
                ...state,
                questionType: action.payload,
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
