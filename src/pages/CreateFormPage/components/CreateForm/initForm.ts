import { IForm, IQuestion } from '@/interfaces/CreateForm.interface';

const initQuestionState: IQuestion = {
    questionType: '0',
    questionId: '1',
    required: true,
    title: { content: '' },
    options: [{ id: '1', value: 'Option 1' }],
    other: false,
};
const initFormState: IForm = {
    formId: '1',
    title: 'Test Form by Monash university',
    numberOfQuestions: 0,
    description:
        'This form is designed to conduct a survey on the employment of IT graduate in 2023',
    questions: [],
};
export { initQuestionState, initFormState };
