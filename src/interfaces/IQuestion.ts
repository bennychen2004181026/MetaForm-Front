import IOption from '@/interfaces/IOption';

interface IQuestion {
    questionType: string;
    title: string;
    options: IOption[];
    other: boolean;
}
export default IQuestion;
