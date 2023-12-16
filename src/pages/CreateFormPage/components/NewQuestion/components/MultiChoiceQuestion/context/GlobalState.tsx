import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import IMultiChoiceQuestion from '@/interfaces/IMuitichoiceQuestion';
import IOption from '@/interfaces/IOption';

const initMuitichoiceQuestion: IMultiChoiceQuestion = {
    title: 'What is your age range?',
    options: [
        { id: 1, value: 'Under 10' },
        { id: 2, value: '10 - 20' },
        { id: 3, value: '20 - 30' },
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
      };

const muitichoiceReducer = (state: IMultiChoiceQuestion, action: Actions): IMultiChoiceQuestion => {
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
        default:
            throw new Error();
    }
};

const MuitichoiceContext = createContext<{
    state: IMultiChoiceQuestion;
    dispatch: Dispatch<Actions>;
}>({ state: initMuitichoiceQuestion, dispatch: () => null });

interface Props {
    children: React.ReactNode;
}
const GlobalState: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(muitichoiceReducer, initMuitichoiceQuestion);
    const value = useMemo(() => {
        return { state, dispatch };
    }, [state]);
    return <MuitichoiceContext.Provider value={value}>{children}</MuitichoiceContext.Provider>;
};
export { MuitichoiceContext, GlobalState };
