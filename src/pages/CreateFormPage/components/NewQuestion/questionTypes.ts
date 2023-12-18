import IOption from '@/interfaces/IOption';

const questionTypes: IOption[] = [
    {
        id: '0',
        value: 'Multiple Choice',
    },
    {
        id: '1',
        value: 'Short Answer',
    },
    {
        id: '2',
        value: 'Paragraph',
    },
    {
        id: '3',
        value: 'Dropdown',
    },
    {
        id: '4',
        value: 'CheckBoxes',
    },
    {
        id: '5',
        value: 'Date Picker',
    },
];
const questionTypeValues = questionTypes.map((questionType) => questionType.value);
const questionTypeKeys = questionTypes.map((questionType) => questionType.id);

export { questionTypes, questionTypeValues, questionTypeKeys };
