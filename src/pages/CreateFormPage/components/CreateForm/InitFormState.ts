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
    formId: '4',
    title: 'Form Title',
    description: 'Form description',
    questions: [initQuestionState],
    expire: '2032',
    createdBy: '1',
    validFrom: '2021',
    numberOfResponses: 0,
};
export { initQuestionState, initFormState };
