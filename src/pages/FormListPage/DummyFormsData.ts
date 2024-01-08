import { IForm } from '@/interfaces/CreateForm';

const dummyFormsData: IForm[] = [
    {
        formId: '1',
        title: 'Test Form by Monash university Web development',
        createdBy: 'Yansong',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '1',
                questionId: '1',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '1',
                questionId: '2',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
    {
        formId: '2',
        title: 'Test Form by Monash university Yansong',
        createdBy: 'Yansong',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '1',
                questionId: '1',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '1',
                questionId: '2',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
    {
        formId: '1',
        title: 'Test Form by Monash university Machine Learning',
        createdBy: 'Yansong',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '3',
                questionId: '1',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '1',
                questionId: '2',
                required: true,
                questionTitle: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
];
export default dummyFormsData;
