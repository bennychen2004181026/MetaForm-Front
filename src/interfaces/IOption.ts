import choice from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/choice.png';

interface IOption {
    id: string;
    value: string;
    icon?: typeof choice;
    otherOption?: boolean;
}
export default IOption;
