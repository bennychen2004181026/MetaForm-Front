import ISelectorOption from '@/interfaces/ISelectorOption';

const questionTypes: ISelectorOption[] = [
    {
        key: 0,
        value: 'Multiple Choice',
    },
    {
        key: 1,
        value: 'Short Answer',
    },
    {
        key: 2,
        value: 'Paragraph',
    },
    {
        key: 3,
        value: 'Dropdown',
    },
    {
        key: 4,
        value: 'CheckBoxes',
    },
    {
        key: 5,
        value: 'Date Picker',
    },
];
const questionTypeValues = questionTypes.map((questionType) => questionType.value);
const questionTypeKeys = questionTypes.map((questionType) => questionType.key);

export { questionTypes, questionTypeValues, questionTypeKeys };
