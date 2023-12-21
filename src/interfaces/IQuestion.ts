import IOption from '@/interfaces/IOption';

interface IQuestion {
    questionType: string;
    title: string;
    options: IOption[];
}
export default IQuestion;
