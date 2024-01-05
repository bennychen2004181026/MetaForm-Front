import { IForm, IQuestion } from '@/interfaces/CreateForm';

const initQuestionState: IQuestion = {
    questionType: '0',
    questionId: '1',
    required: true,
    title: { content: 'Question title' },
    options: [],
    other: false,
};
const initFormState: IForm = {
    formId: '1',
    title: 'Form Title',
    description: 'Form description',
    questions: [],
};
export { initQuestionState, initFormState };
