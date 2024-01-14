import { IForm, IQuestion } from '@/interfaces/CreateForm';

const initQuestionState: IQuestion = {
    questionType: '0',
    questionId: '1',
    required: true,
    questionTitle: { content: 'Question title' },
    options: [],
    other: false,
    acceptFileTypes: ['0', '1', '2', '3'],
};
const initFormState: IForm = {
    formId: '4',
    title: 'Form Title',
    description: 'Form description',
    questions: [initQuestionState],
    createdBy: '1',
    responses: [],
};
export { initQuestionState, initFormState };
