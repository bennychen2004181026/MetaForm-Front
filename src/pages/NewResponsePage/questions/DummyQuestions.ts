import { IQuestion } from '@/interfaces/CreateForm';

const dummyQuestions: IQuestion[] = [
    {
        questionType: '0',
        questionId: '0',
        required: true,
        questionTitle: { content: 'Multichoice Question' },
        options: [
            { id: '0', value: 'option1' },
            { id: '1', value: 'option 2' },
            { id: '2', value: 'option 3' },
        ],
        other: true,
    },
    {
        questionType: '1',
        questionId: '1',
        required: true,
        questionTitle: { content: 'Short Answer Question' },
        options: [],
        other: false,
    },
    {
        questionType: '2',
        questionId: '2',
        required: true,
        questionTitle: { content: 'Long Answer Question' },
        options: [],
        other: false,
    },
    {
        questionType: '3',
        questionId: '3',
        required: true,
        questionTitle: { content: 'CheckBoxes Question' },
        options: [
            { id: '0', value: 'option1' },
            { id: '1', value: 'option 2' },
            { id: '2', value: 'option 3' },
        ],
        other: false,
    },

    {
        questionType: '4',
        questionId: '4',
        required: true,
        questionTitle: { content: 'File Upload Question' },
        options: [],
        other: false,
    },
    {
        questionType: '5',
        questionId: '5',
        required: true,
        questionTitle: { content: 'Date Picker' },
        options: [],
        other: false,
    },
    {
        questionType: '6',
        questionId: '6',
        required: true,
        questionTitle: { content: 'Time Picker' },
        options: [],
        other: false,
    },
];
export default dummyQuestions;
