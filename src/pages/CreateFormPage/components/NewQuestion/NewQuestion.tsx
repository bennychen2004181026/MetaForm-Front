import React from 'react';

import QuillEditor from '../CreateForm/components/QuillEditor/QuillEditor';

import QuestionBody from './components/QuestionBody/QuestionBody';
import BottomToolbar from '@/pages/CreateFormPage/components/NewQuestion/components/BottomToolbar';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const NewQuestion = () => {
    return (
        <GlobalState>
            <div>
                <QuestionTitle />
                <QuestionBody />
                <BottomToolbar />
                {/* <TextEditor /> */}
            </div>
        </GlobalState>
    );
};
export default NewQuestion;
